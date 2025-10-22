import { useState } from 'react';

interface SettingsProps {
    onSave: (settings: UserSettings) => void;
}

interface UserSettings {
    notifications: {
        email: boolean;
        push: boolean;
        bet: boolean;
    };
    security: {
        twoFactor: boolean;
        loginAlerts: boolean;
    };
    display: {
        darkMode: boolean;
        showBalance: boolean;
    };
}

export default function Settings({ onSave }: SettingsProps) {
    const [settings, setSettings] = useState<UserSettings>({
        notifications: {
            email: true,
            push: true,
            bet: true
        },
        security: {
            twoFactor: false,
            loginAlerts: true
        },
        display: {
            darkMode: true,
            showBalance: true
        }
    });

    const handleToggle = (category: keyof UserSettings, setting: string) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [setting]: !prev[category][setting as keyof typeof prev[typeof category]]
            }
        }));
    };

    const handleSave = () => {
        onSave(settings);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-6">Settings</h2>

            {/* Notifications Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.notifications.email}
                                onChange={() => handleToggle('notifications', 'email')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Push Notifications</p>
                            <p className="text-sm text-gray-500">Get push notifications in browser</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.notifications.push}
                                onChange={() => handleToggle('notifications', 'push')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Bet Notifications</p>
                            <p className="text-sm text-gray-500">Get notified about bet results</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.notifications.bet}
                                onChange={() => handleToggle('notifications', 'bet')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Security</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-gray-500">Add an extra layer of security</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.security.twoFactor}
                                onChange={() => handleToggle('security', 'twoFactor')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Login Alerts</p>
                            <p className="text-sm text-gray-500">Get notified of new logins</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.security.loginAlerts}
                                onChange={() => handleToggle('security', 'loginAlerts')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            {/* Display Section */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Display</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Dark Mode</p>
                            <p className="text-sm text-gray-500">Toggle dark/light theme</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.display.darkMode}
                                onChange={() => handleToggle('display', 'darkMode')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-medium">Show Balance</p>
                            <p className="text-sm text-gray-500">Display balance in header</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={settings.display.showBalance}
                                onChange={() => handleToggle('display', 'showBalance')}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                    </div>
                </div>
            </div>

            <button
                onClick={handleSave}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
            >
                Save Changes
            </button>
        </div>
    );
}