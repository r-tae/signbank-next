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
      {showVideoManager &&
        <Sheet sx={{ m: 1, display: 'flex', justifyContent: 'space-evenly', gap: 2, alignItems: 'center', width: 'auto' }}>
          <Typography>This sign has {videos?.length} videos</Typography>
          <Button sx={{ float: 'right' }} endIcon={<VideoLibraryIcon />}>
            Video manager
          </Button>
        </Sheet>
      }
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

export const DetailEntry = () => {
  const entry = useDictionaryEntryContext() as DetailDictionaryEntry
  const user = useUserContext()
  const { t } = useTranslation(['common'])

  const router = useRouter()

  const handleDetailViewToggle = () => {
    router.push(`/dictionary/${entry.idGloss}`, undefined, { shallow: true })
  }

  if (!entry) {
    return null
  }

  const tabTitles = [
    t('entry.detail.basic-heading', {
      tDescription: 'heading for basic information section of detail view',
    }),
    t('entry.detail.phonology-heading', {
      tDescription: 'heading for phonology section of detail view',
    }),
    t('entry.detail.relations-heading', {
      tDescription: 'relations heading in detail view',
    }),
    t('entry.detail.definitions-heading', {
      tDescription: 'definitions heading in detail view',
    }),
  ]

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
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button color="neutral" onClick={handleDetailViewToggle} sx={{ marginLeft: 'auto' }}>
            {t('entry.switch-view-to', {
              context: 'public',
              tDescription:
                'button that switches from the researcher view to the ordinary dictionary entry',
            })}
          </Button>
        </Box>
        <KeyInfo entry={entry} />
        <Card variant="outlined">
          <Tabs
            defaultValue={0}
            orientation="vertical"
            sx={{
              flexDirection: "column",
            }}
          >
            <TabList sx={{
              margin: -1,
              marginBottom: 1,
            }}>
              {tabTitles.map(tabTitle => <Tab>{tabTitle}</Tab>)}
            </TabList>
            <TabPanel value={0}>
              <List>
                <ListItem>
                  <Typography>
                    <Typography fontWeight="lg">{t('entry.detail.morphology-heading')}:</Typography>{' '}
                    {entry.morphology}
                  </Typography>
                </ListItem>
                <ListDivider inset="gutter" />

                <ListItem>
                  <Typography>
                    <Typography fontWeight="lg">{t('entry.detail.compound-of-heading')}:</Typography>{' '}
                    {entry.compound}
                  </Typography>
                </ListItem>
                <ListDivider inset="gutter" />


                <ListItem>
                  <Typography>
                    <Typography fontWeight="lg">{t('entry.detail.language-heading')}:</Typography>{' '}
                    {/* TODO: move to component with switch statement, to make translations statically analysable */}
                    {t(`language-code.${entry.language.code}`)}
                  </Typography>
                </ListItem>
                <ListDivider inset="gutter" />


                <ListItem>
                  <Typography>
                    <Typography fontWeight="lg">{t('entry.detail.proposed-sign-heading')}:</Typography>{' '}
                    {entry.proposedNewSign ? "Yes" : "No"}
                  </Typography>
                </ListItem>


                {/* <ListDivider inset="gutter" />
                <ListItem>
                  <Typography>
                    <Typography fontWeight="lg">{t('entry.keywords-heading')}:</Typography>{' '}
                    
                  </Typography>
                </ListItem>
                <ListDivider inset="gutter" /> */}
              </List>
            </TabPanel>
            <TabPanel value={1}>
              phon
            </TabPanel>
            <TabPanel value={2}>
              relations
            </TabPanel>
            <TabPanel value={3}>
              definitions/notes
            </TabPanel>
          </Tabs>
        </Card>
      </Stack>
    </Stack>
  )
}

export const ArchiveDetailEntry = () => {
  const entry = useDictionaryEntryContext() as DetailDictionaryEntry
  const user = useUserContext()
  const { t } = useTranslation(['common'])

  const router = useRouter()

  const headSignVideoRef = useRef(null)

  const handleDetailViewToggle = () => {
    router.push(`/dictionary/${entry.idGloss}`, undefined, { shallow: true })
  }

  if (!entry) {
    return null
  }

  return (
    <>
      <Head>
        <title>
          {entry.idGloss} | {publicRuntimeConfig.SITE_NAME}
        </title>
      </Head>
      <Entry className={user.isLexicographer ? "userIsLexicographer" : ""}>
        {{
          headsign: (
            <div>
              <video
                src={
                  `${publicRuntimeConfig.STATIC_URL}${entry.videos?.sort(
                    (a: { version: number }, b: { version: number }) =>
                      a.version - b.version
                  )?.[0].url}`
                }
                controls
                muted
                preload="auto"
                ref={headSignVideoRef}
              />
              {user.isLexicographer &&
                <VersionManagerWidget videos={entry.videos} idGloss={entry.idGloss} />
              }
            </div>
          ),
          sidebar: [
            "Tags should go here",
            "Personal notes should go here",
          ],
          body: [
            <div className='ml-auto'>
              <Button onClick={handleDetailViewToggle}>
                {t('entry.switch-view-to', {
                  context: 'public',
                  tDescription:
                    'button that switches from the researcher view to the ordinary dictionary entry',
                })}
              </Button>
            </div>,
            // TODO: move entry to context
            // <KeyInfo />,
            // <Properties />
          ],
        }}
      </Entry>
    </>
  )
}