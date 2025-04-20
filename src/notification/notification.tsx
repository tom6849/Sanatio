import React, { useEffect } from 'react';
import { View, Alert } from 'react-native';
import { requestPermissions, createChannel, scheduleLocalNotification, cancelNotifications } from './notificationsUtils'; 
import { useMedication } from '../context/MedicationContext';

export default function Notifications() {
    const { medToday } = useMedication();

    useEffect(() => {
        const setupNotifications = async () => {
            if (!medToday || medToday.length === 0) return;

            const hasPermission = await requestPermissions();
            if (!hasPermission) {
                Alert.alert('Permissions requises', 'Activez les notifications dans les paramètres.');
                return;
            }

            await createChannel();

            await cancelNotifications();

            medToday.forEach(({ time, name }) => {
                if (time) {
                    const today = new Date();
                    const [hours, minutes] = time.split(':').map(Number);
                    today.setHours(hours, minutes, 0, 0);

                    console.log(`Notification programmée pour ${today.toLocaleTimeString()}`);
                    scheduleLocalNotification(today, name);
                }
            });
        };

        setupNotifications();
    }, [medToday]);  // Re-exécute la logique chaque fois que medToday change

    return <View />;
}
