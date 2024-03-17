import {FC} from "react"
import {SubmitHandler, UseFormProps, useFormContext} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {LabeledField} from "../LabeledField"
import {Alert, Box, FormHelperText, Input} from "@mui/joy"
import {SxProps} from "@mui/joy/styles/types"
import {z, ZodType} from "zod"

export interface QRCodeFormValues {
  url: string
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

      {errors.root && (
        <Alert color="danger" variant="soft" sx={{mt: 2}}>
          {errors.root.message}
        </Alert>
      )}
    </Box>
  )
}

const qrCodeFormSchema: ZodType<QRCodeFormValues> = z.object({
  url: z.string()
})

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
    url: qrCode?.url ?? ""
  }
}
