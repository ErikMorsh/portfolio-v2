import GitHubIcon from '@mui/icons-material/GitHub'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Box, Link, Paper, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { portfolioRepository, portfolioStack } from '../data/portfolio-source'

export function WelcomePortfolioSource() {
  const { t } = useTranslation()
  const stackSummary = portfolioStack
    .map((item) => `${item.name} ${item.share}%`)
    .join(', ')

  return (
    <Paper className="welcome__portfolio-source" elevation={0} component="aside">
      <Box className="welcome__sidebar-panel-inner welcome__portfolio-source-inner">
        <Typography className="welcome__sidebar-title" component="h2" variant="subtitle1">
          {t('welcome.portfolio.title')}
        </Typography>

        <Typography className="welcome__portfolio-source-subtitle" variant="caption" color="text.secondary">
          {t('welcome.portfolio.subtitle')}
        </Typography>

        <Box
          className="welcome__portfolio-source-bar"
          role="img"
          aria-label={t('welcome.portfolio.stackAria', { stack: stackSummary })}
        >
          {portfolioStack.map((item) => (
            <Box
              key={item.id}
              className="welcome__portfolio-source-bar-segment"
              style={{
                flexGrow: item.share,
                backgroundColor: item.color,
              }}
              title={`${item.name} ${item.share}%`}
            />
          ))}
        </Box>

        <Box className="welcome__portfolio-source-legend" component="ul">
          {portfolioStack.map((item) => (
            <Box key={item.id} className="welcome__portfolio-source-legend-item" component="li">
              <span
                className="welcome__portfolio-source-legend-dot"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <Typography className="welcome__portfolio-source-legend-name" component="span" variant="body2">
                {item.name}
              </Typography>
              <Typography
                className="welcome__portfolio-source-legend-share"
                component="span"
                variant="caption"
                color="text.secondary"
              >
                {item.share}%
              </Typography>
            </Box>
          ))}
        </Box>

        <Link
          className="welcome__portfolio-source-repo"
          href={portfolioRepository.href}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        >
          <GitHubIcon className="welcome__portfolio-source-repo-icon" fontSize="small" />
          <Box className="welcome__portfolio-source-repo-text">
            <Typography className="welcome__portfolio-source-repo-label" component="span" variant="caption">
              {t('welcome.portfolio.viewSource')}
            </Typography>
            <Typography className="welcome__portfolio-source-repo-name" component="span" variant="body2">
              {portfolioRepository.label}
            </Typography>
          </Box>
          <OpenInNewIcon className="welcome__portfolio-source-repo-external" fontSize="inherit" />
        </Link>
      </Box>
    </Paper>
  )
}
