import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Box, Breadcrumbs, Link as MuiLink, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export type PanelBreadcrumbItem = {
  label: string
  to?: string
}

type Main2ToolbarProps = {
  backTo: string
  items: PanelBreadcrumbItem[]
}

export function Main2Toolbar({ backTo, items }: Main2ToolbarProps) {
  const { t } = useTranslation()

  return (
    <Box className="welcome__main2-toolbar">
      <Breadcrumbs
        className="welcome__main2-breadcrumb"
        separator={<NavigateNextIcon className="welcome__main2-breadcrumb-separator" fontSize="small" />}
        aria-label={t('nav.breadcrumb')}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          if (item.to && !isLast) {
            return (
              <MuiLink
                key={`${item.label}-${index}`}
                component={Link}
                to={item.to}
                underline="hover"
                variant="body2"
                color="inherit"
              >
                {item.label}
              </MuiLink>
            )
          }

          return (
            <Typography
              key={`${item.label}-${index}`}
              variant="body2"
              color={isLast ? 'text.primary' : 'text.secondary'}
              className="welcome__main2-breadcrumb-current"
            >
              {item.label}
            </Typography>
          )
        })}
      </Breadcrumbs>

      <MuiLink
        className="job-page__back"
        component={Link}
        to={backTo}
        underline="hover"
        variant="body2"
      >
        <ArrowBackIcon className="job-page__back-icon" fontSize="inherit" />
        {t('job.back')}
      </MuiLink>
    </Box>
  )
}
