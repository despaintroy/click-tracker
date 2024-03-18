import {FC} from "react"
import {SubmitHandler, UseFormProps, useFormContext} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {LabeledField} from "../LabeledField"
import {Alert, Box, FormHelperText, Input} from "@mui/joy"
import {SxProps} from "@mui/joy/styles/types"
import {z} from "zod"

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
        {errors.light && (
          <FormHelperText>{errors.light.message}</FormHelperText>
        )}
      </LabeledField>

      <LabeledField
        label="Dark Color"
        error={!!errors.dark}
        maxFieldWidth={maxFieldWidth}
      >
        <input {...register("dark")} type="color" />
        {errors.dark && <FormHelperText>{errors.dark.message}</FormHelperText>}
      </LabeledField>

      <LabeledField
        label="Margin"
        error={!!errors.margin}
        maxFieldWidth={maxFieldWidth}
      >
        <Input {...register("margin")} type="number" />
        {errors.margin && (
          <FormHelperText>{errors.margin.message}</FormHelperText>
        )}
      </LabeledField>

      {errors.root && (
        <Alert color="danger" variant="soft" sx={{mt: 2}}>
          {errors.root.message}
        </Alert>
      )}
    </Box>
  )
}

export const qrCodeFormSchema = z.object({
  url: z.string().default(""),
  light: z
    .string()
    .refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    })
    .default("#ffffff"),
  dark: z
    .string()
    .refine((value) => /^#[0-9a-fA-F]{6}$/.test(value), {
      message: "Invalid hex color"
    })
    .default("#000000"),
  margin: z.coerce.number().nonnegative().default(3)
})

export type QRCodeFormValues = z.infer<typeof qrCodeFormSchema>

export function getQRCodeFormInitializer(
  qrCode?: Partial<Models.QRCode>
): UseFormProps<QRCodeFormValues> {
  return {
    resolver: zodResolver(qrCodeFormSchema),
    defaultValues: getQRCodeFormValues(qrCode),
    mode: "onChange"
  }
}

export function getQRCodeFormValues(
  qrCode: Partial<Models.QRCode> = {}
): QRCodeFormValues {
  return qrCodeFormSchema.parse(qrCode)
}
