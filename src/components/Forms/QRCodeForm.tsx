import {FC} from "react"
import {SubmitHandler, UseFormProps, useFormContext} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {LabeledField} from "../LabeledField"
import {Alert, Box, FormHelperText, Input} from "@mui/joy"
import {SxProps} from "@mui/joy/styles/types"
import {z, ZodType} from "zod"

export interface QRCodeFormValues {
  url: string
  light: string
  dark: string
}

interface QRCodeFormProps {
  onSubmit?: SubmitHandler<QRCodeFormValues>
  formId: string
  sx?: SxProps
  maxFieldWidth?: string | number
}

export const QRCodeForm: FC<QRCodeFormProps> = (props) => {
  const {onSubmit, formId, sx, maxFieldWidth} = props

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useFormContext<QRCodeFormValues>()

  return (
    <Box
      component="form"
      onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
      id={formId}
      sx={sx}
    >
      <LabeledField
        label="URL"
        error={!!errors.url}
        maxFieldWidth={maxFieldWidth}
      >
        <Input
          {...register("url")}
          placeholder="https://example.com"
          type="url"
        />
        {errors.url && <FormHelperText>{errors.url.message}</FormHelperText>}
      </LabeledField>

      <LabeledField
        label="Light Color"
        error={!!errors.light}
        maxFieldWidth={maxFieldWidth}
      >
        <input {...register("light")} type="color" />
        {errors.light && <FormHelperText>{errors.light.message}</FormHelperText>}
      </LabeledField>

      <LabeledField
        label="Dark Color"
        error={!!errors.dark}
        maxFieldWidth={maxFieldWidth}
      >
        <input {...register("dark")} type="color" />
        {errors.dark && <FormHelperText>{errors.dark.message}</FormHelperText>}
      </LabeledField>

      {errors.root && (
        <Alert color="danger" variant="soft" sx={{mt: 2}}>
          {errors.root.message}
        </Alert>
      )}
    </Box>
  )
}

const qrCodeFormSchema: ZodType<QRCodeFormValues> = z.object({
    url: z.string(),
    light: z.string().refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    }),
    dark: z.string().refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    })
  }
)

export function getQRCodeFormInitializer(
  qrCode?: Models.QRCode
): UseFormProps<QRCodeFormValues> {
  return {
    resolver: zodResolver(qrCodeFormSchema),
    defaultValues: getQRCodeFormValues(qrCode ?? null)
  }
}

export function getQRCodeFormValues(
  qrCode: Models.QRCode | null
): QRCodeFormValues {
  return {
    url: qrCode?.url ?? "",
    light: qrCode?.light ?? "#ffffff",
    dark: qrCode?.dark ?? "#000000"
  }
}
