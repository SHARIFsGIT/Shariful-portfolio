import { IconGalaxy } from '@tabler/icons-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import {
  FiBell,
  FiLoader,
  FiLock,
  FiMoon,
  FiSave,
  FiSearch,
  FiShield,
  FiSun,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { Wallpaper } from './wallpaper'
// Create local Alert components since we don't have access to the UI library
const Alert = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900 dark:bg-yellow-900/30">
    {children}
  </div>
)

const AlertTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-1 font-medium">{children}</h3>
)

const AlertDescription = ({ children }: { children: React.ReactNode }) => (
  <div className="text-sm text-gray-600 dark:text-gray-300">{children}</div>
)

interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onCheckedChange,
  disabled,
}) => (
  <button
    role="switch"
    aria-checked={checked}
    disabled={disabled}
    onClick={() => !disabled && onCheckedChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      checked ? 'bg-primary' : 'bg-gray-200'
    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
)

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ProfileFormData {
  fullName: string
  email: string
  phone: string
  language: string
  timezone: string
  twoFactorEnabled: boolean
}

export function Settings() {
  const [tab, setTab] = useState<
    'profile' | 'notifications' | 'appearance' | 'wallpaper' | 'security'
  >('profile')
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: 'Shariful Islam',
    email: 'sharifaiub15@gmail.com',
    phone: '+1 (555) 123-4567',
    language: 'English',
    timezone: 'UTC-5',
    twoFactorEnabled: true,
  })

  const [notifications, setNotifications] = useState({
    email: {
      marketing: true,
      security: true,
      updates: false,
      newsletter: false,
    },
    push: {
      mentions: true,
      directMessages: true,
      updates: false,
    },
    desktop: {
      enabled: true,
      sound: true,
      focus: false,
    },
  })

  const showToast = useCallback(
    (message: string, type: 'success' | 'error') => {
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message, type }])
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
      }, 3000)
    },
    []
  )

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      showToast('Settings saved successfully', 'success')
    } catch {
      showToast('Failed to save settings', 'error')
    } finally {
      setLoading(false)
    }
  }

  const ProfileSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Profile Settings</h2>
        <div className="space-x-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
            Save Changes
          </button>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="relative">
          <Image
            alt="Profile"
            src="/assets/images/author.jpg"
            width={100}
            height={100}
            className="rounded-full"
          />
          <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-white hover:bg-primary/90">
            <FiUser className="size-4" />
          </button>
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{formData.fullName}</h2>
          <p className="text-sm text-gray-500">{formData.email}</p>
          <p className="text-sm text-gray-500">Member since Oct 2023</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Timezone</label>
            <select
              value={formData.timezone}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, timezone: e.target.value }))
              }
              className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
            >
              <option value="UTC-8">Pacific Time (UTC-8)</option>
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC+0">UTC</option>
              <option value="UTC+1">Central European Time (UTC+1)</option>
            </select>
          </div>
        </div>
      </div>

      <Alert>
        <AlertTitle>Verification Required</AlertTitle>
        <AlertDescription>
          Please verify your email address to enable all account features.
          <button className="ml-2 text-primary hover:underline">
            Resend verification email
          </button>
        </AlertDescription>
      </Alert>
    </div>
  )

  const NotificationsSection = () => (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">Notification Preferences</h2>
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Email Notifications</h3>
          <div className="space-y-4">
            {Object.entries(notifications.email).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">{key} Emails</h4>
                  <p className="text-sm text-gray-500">
                    Receive {key.toLowerCase()} related email updates
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      email: { ...prev.email, [key]: checked },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium">Push Notifications</h3>
          <div className="space-y-4">
            {Object.entries(notifications.push).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Get notified about {key.toLowerCase()}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setNotifications((prev) => ({
                      ...prev,
                      push: { ...prev.push, [key]: checked },
                    }))
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const SecuritySection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Security Settings</h2>

      <div className="space-y-6">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <h3 className="font-medium">Two-Factor Authentication</h3>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch
            checked={formData.twoFactorEnabled}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, twoFactorEnabled: checked }))
            }
          />
        </div>

        <div className="rounded-lg border p-4">
          <h3 className="mb-4 font-medium">Active Sessions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Chrome - Mac OS</p>
                <p className="text-sm text-gray-500">Last active: Just now</p>
              </div>
              <button className="text-sm text-red-500 hover:underline">
                End Session
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mobile App - iPhone</p>
                <p className="text-sm text-gray-500">
                  Last active: 2 hours ago
                </p>
              </div>
              <button className="text-sm text-red-500 hover:underline">
                End Session
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Password</h3>
          <button className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm hover:bg-gray-50">
            <FiLock /> Change Password
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="grid h-full grid-cols-[250px,1fr] text-light-text dark:text-dark-text">
      <div className="max-h-full overflow-y-auto bg-light-foreground p-4 dark:bg-dark-foreground">
        <div className="relative mb-4">
          <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search settings..."
            className="w-full rounded-md bg-white px-3 py-2 pl-8 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:bg-dark-input-bg"
          />
        </div>

        <div className="my-4 grid grid-cols-[auto,1fr] items-center gap-3">
          <div className="size-10">
            <Image
              alt="Profile"
              src="/assets/images/author.jpg"
              width={40}
              height={40}
              className="size-full rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h5 className="font-medium">{formData.fullName}</h5>
            <p className="text-xs text-gray-500">Apple ID</p>
          </div>
        </div>

        <nav className="mt-6 space-y-1">
          {[
            { id: 'profile', icon: FiUser, label: 'Profile' },
            { id: 'notifications', icon: FiBell, label: 'Notifications' },
            {
              id: 'appearance',
              icon: darkMode ? FiMoon : FiSun,
              label: 'Appearance',
            },
            { id: 'security', icon: FiShield, label: 'Security' },
            { id: 'wallpaper', icon: IconGalaxy, label: 'Wallpaper' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTab(id as typeof tab)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-2 transition-colors ${
                tab === id
                  ? 'bg-white text-primary dark:bg-dark-hover-bg'
                  : 'hover:bg-white/50 dark:hover:bg-dark-hover-bg'
              }`}
            >
              <div className="flex size-5 items-center justify-center rounded-md bg-primary/10">
                <Icon
                  className={`${tab === id ? 'text-primary' : 'text-gray-600'}`}
                />
              </div>
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="max-h-full overflow-y-auto bg-white p-6 dark:bg-dark-background">
        {tab === 'profile' && <ProfileSection />}
        {tab === 'notifications' && <NotificationsSection />}
        {tab === 'security' && <SecuritySection />}
        {tab === 'appearance' && (
          <div className="space-y-6">
            <div className="flex justify-between">
              <h2 className="text-2xl font-semibold">Appearance</h2>
              <button
                onClick={handleSave}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm text-white hover:bg-primary/90 disabled:opacity-50"
              >
                {loading ? <FiLoader className="animate-spin" /> : <FiSave />}
                Save Changes
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-500">
                    Toggle dark mode appearance
                  </p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Language & Region</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          language: e.target.value,
                        }))
                      }
                      className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Chinese">Chinese</option>
                      <option value="Japanese">Japanese</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Zone</label>
                    <select
                      value={formData.timezone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          timezone: e.target.value,
                        }))
                      }
                      className="w-full rounded-md border px-3 py-2 dark:bg-dark-input-bg"
                    >
                      <option value="UTC-8">Pacific Time (UTC-8)</option>
                      <option value="UTC-5">Eastern Time (UTC-5)</option>
                      <option value="UTC+0">UTC</option>
                      <option value="UTC+1">
                        Central European Time (UTC+1)
                      </option>
                      <option value="UTC+8">China Standard Time (UTC+8)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Theme Preferences</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {['System Default', 'Light', 'Dark'].map((theme) => (
                    <button
                      key={theme}
                      className={`flex items-center justify-center rounded-lg border p-4 transition-colors hover:border-primary ${
                        (theme === 'Dark' && darkMode) ||
                        (theme === 'Light' && !darkMode)
                          ? 'border-primary bg-primary/5'
                          : ''
                      }`}
                      onClick={() => setDarkMode(theme === 'Dark')}
                    >
                      <span className="font-medium">{theme}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === 'wallpaper' && <Wallpaper />}
      </div>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-white ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              className="ml-2"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
