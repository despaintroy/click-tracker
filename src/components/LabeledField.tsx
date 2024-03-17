import {Box, FormControl, FormLabel, Typography} from "@mui/joy"
import type {FC, PropsWithChildren} from "react"
import React from "react"

interface LabeledFieldProps {
  label: string
  helperText?: string
  maxFieldWidth?: string | number
  error?: boolean
}

export const LabeledField: FC<PropsWithChildren<LabeledFieldProps>> = (
  props
) => {
  const {maxFieldWidth = 500, label, children, helperText, error} = props

  return (
    <FormControl
      error={error}
      className="labeled-field"
      sx={{
        display: "flex",
        flexDirection: "row",
        rowGap: 0.5,
        columnGap: 4,
        flexWrap: "wrap",

        // Gap between consecutive labeled fields
        "& + &": {mt: 3}
      }}
    >
      <Box sx={{width: "100%", maxWidth: "250px"}}>
        <FormLabel sx={{mb: "2px"}}>{label}</FormLabel>
        {helperText && (
          <Typography level="body-xs" lineHeight={1.2} fontWeight={400}>
            {helperText}
          </Typography>
        )}
      </Box>
      <Box sx={{maxWidth: maxFieldWidth, width: "100%"}}>{children}</Box>
    </FormControl>
  )
}
