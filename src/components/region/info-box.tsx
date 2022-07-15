import { useTranslation } from 'next-i18next'
import { MapSvg } from './map-svg'

interface RegionInfoBoxProps {
  region: string
  languageCode: string
  traditional: boolean
}

// TODO: find a place to put the i18n descriptions

export function RegionInfoBox({ region, traditional }: RegionInfoBoxProps) {
  const { t } = useTranslation(['common'])

  return (
    <div className="align-center my-4 flex flex-row items-center justify-center gap-4">
      <div>
        <h2 className="font-quicksand font-bold">
          {/* NOTE: heading for map and text description the geographic distribution of a sign */}
          {t('region-info-box.distribution-heading')}
        </h2>
        <p className="text-sm">
          {t(`human-readable-region-name`, 'Unknown', { context: region })}{' '}
          {/* NOTE: `shown after name of the region of usage for a sign (e.g. "Australia-wide traditional")  */}
          {traditional && t(`usage.traditional`)}
        </p>
      </div>
      <div className="w-50%">
        <MapSvg select={region} />
      </div>
    </div>
  )
}
