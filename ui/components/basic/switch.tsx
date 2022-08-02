import { Switch as BaseSwitch } from "@headlessui/react";

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  ariaLabel?: string
}

export function Switch({ checked, onChange, ariaLabel, ...props }: SwitchProps) {
  return (
    <BaseSwitch
      {...props}
      checked={checked}
      onChange={onChange}
      className={`${
        checked ? 'bg-blue-600' : 'bg-gray-200'
      } relative inline-flex h-5 w-9 items-center rounded-full`}
    // } relative inline-flex h-6 w-11 items-center rounded-full`}
    aria-label={ariaLabel}
    >
      <span
        className={`${
          checked ? 'translate-x-5' : 'translate-x-1'
        } inline-block h-3 w-3 transform rounded-full bg-white`}
      // } inline-block h-4 w-4 transform rounded-full bg-white`}
      />
    </BaseSwitch>
  )
}


{/* <Switch
  checked={data?.proposedNewSign}
  onChange={() => {}}
  className={`${
    data.proposedNewSign ? 'bg-blue-600' : 'bg-gray-200'
  } relative inline-flex h-6 w-11 items-center rounded-full`}
>
  <span className="sr-only">Enable notifications</span>
  <span
    className={`${
      data.proposedNewSign ? 'translate-x-6' : 'translate-x-1'
    } inline-block h-4 w-4 transform rounded-full bg-white`}
  />
</Switch> */}