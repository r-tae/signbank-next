import React, { useRef } from 'react'
import getConfig from "next/config";
import Head from 'next/head'
const { publicRuntimeConfig } = getConfig();

import { VersionManagerWidget } from '@/components/video-version-manager';
import { Entry } from '@/components/layout';
import { useDictionaryEntryContext } from '@/lib/context/dictionary-entry';
import { Definition, DetailDictionaryEntry } from '@/types/api/entry';
import { useTranslation } from 'next-i18next';
import { useUserContext } from '@/lib/context/user';
import { useRouter } from 'next/router';
import { Video } from '@/types/db';

import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { Box } from '@mui/system';
import Button from '@mui/joy/Button';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { List, ListDivider, ListItem, Stack, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import { DefinitionList } from '@/components/detail-entry';
import { RegionInfoBox } from '@/components/region';

const HeadsignVideo = ({ videos, showVideoManager }: { showVideoManager: boolean, videos: Video[] }) => {
  const { t } = useTranslation(['common'])
  const video = videos?.sort((a: any, b: any) => a.version < b.version ? -1 : 1)[0]

  return (
    <Sheet
      variant='outlined'
      sx={{ borderRadius: 'sm', overflow: 'auto' }}
    >
      <AspectRatio ratio={4/3}>
        {video?.url ?
          <video autoPlay muted>
            <source src={`${publicRuntimeConfig.STATIC_URL}${video?.url}`} />
          </video>
          :
          <div>
            {t('entry.no-video')}
          </div>
        }
      </AspectRatio>
    </Sheet>
  )
}

const KeyInfo = ({ entry }: { entry: DetailDictionaryEntry }) => {
  const { t } = useTranslation(['common'])

  return (
    <List
      variant="outlined"
      sx={{
        flexGrow: 0,
        minWidth: 240,
        borderRadius: 'sm',
        '--List-decorator-size': '48px',
        '--List-item-paddingLeft': '1.5rem',
        '--List-item-paddingRight': '1rem',
      }}
    >
      <ListItem>
        <Typography>
          <Typography fontWeight="lg">{t('entry.id-gloss')}:</Typography>{' '}
          {entry.idGloss}
        </Typography>
      </ListItem>

      <ListDivider inset="gutter" />

      <ListItem>
        <Typography>
          <Typography fontWeight="lg">{t('entry.annotation-id-gloss')}:</Typography>{' '}
          {entry.annotationIdGloss}
        </Typography>
      </ListItem>

      <ListDivider inset="gutter" />

      <ListItem>
        <Typography>
          <Typography fontWeight="lg">{t('entry.keywords-heading')}:</Typography>{' '}
          {entry.keywords.map((x, index) => (
            <Typography key={x.text}>
              {index ? ', ' : ''}
              {/* TODO: change this so the search query highlighted */}
              {x.text}
            </Typography>
          ))}
        </Typography>
      </ListItem>

      <ListDivider inset="gutter" />

      <ListItem>
        <Typography>
          <Typography fontWeight="lg">{t('entry.distribution-heading')}:</Typography>{' '}
          {t(`human-readable-region-name`, 'Unknown', {
            context: entry.language.region,
          })}{' '}
          {entry.language.traditional &&
            t(`usage.traditional`, {
              tDescription: `shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")`,
            })}
        </Typography>
      </ListItem>
    </List>
  )
}

export const PublicEntry = () => {
  const entry = useDictionaryEntryContext() as DetailDictionaryEntry
  const user = useUserContext()
  const { t } = useTranslation(['common'])

  const router = useRouter()

  const handleDetailViewToggle = () => {
    router.push(`/dictionary/${entry.idGloss}/detail`, undefined, { shallow: true })
  }

  if (!entry) {
    return null
  }

  return (
    <Stack
      spacing={2}
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ justifyContent: 'center' }}
    >
      <Head>
        <title>
          {entry.idGloss} | {publicRuntimeConfig.SITE_NAME}
        </title>
      </Head>
      <Stack spacing={2}>
        <HeadsignVideo showVideoManager={user.isLexicographer} videos={entry.videos} />
        <Card variant='outlined'>
          <Typography fontStyle="italic">
            This card will contain the tags (once they're imported)
          </Typography>
        </Card>
      </Stack>
      <Stack spacing={2}>
        {user.isLexicographer &&
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button color="neutral" onClick={handleDetailViewToggle} sx={{ marginLeft: 'auto' }}>
              {t('entry.switch-view-to', {
                context: 'detail',
                tDescription:
                  'button that switches from the ordinary dictionary entry to the researcher view',
              })}
            </Button>
          </Box>
        }
        <RegionInfoBox region={entry.language.region} traditional={entry.language.traditional} languageCode={entry.language.code} />
        <Card variant="outlined">
          <DefinitionList definitions={entry.definitions} />
        </Card>
      </Stack>
    </Stack>
  )
}
