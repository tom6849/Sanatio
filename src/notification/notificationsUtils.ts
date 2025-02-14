import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AndroidVisibility } from '@notifee/react-native';

let scheduledNotifications: { id: string, time: string, medication: string }[] = [];

// Demander les permissions pour Android 33+
export async function requestPermissions() {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
        const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );
        return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
}

// Créer un canal de notification
export async function createChannel() {
    return await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
        vibration: true,
    });
}

// Annuler toutes les notifications programmées
export async function cancelNotifications() {
    try {
        await notifee.cancelAllNotifications();
        scheduledNotifications = []; 
        console.log('Toutes les notifications ont été annulées.');
    } catch (error) {
        console.error('Erreur lors de la suppression des notifications :', error);
    }
}

// Programmer une nouvelle notification
export async function scheduleLocalNotification(date: Date, medication: string) {
    const now = new Date();
    if (date <= now) {
        return;  
    }
    date.setSeconds(date.getSeconds() + 5); 

    const trigger: TimestampTrigger = {
        type: TriggerType.TIMESTAMP,
        timestamp: date.getTime(),
    };

    const notificationId = `${date.toLocaleTimeString()}-${medication}`;

    const existingNotification = scheduledNotifications.find(
        (notification) => notification.id === notificationId
    );

    if (existingNotification) {
        console.log(`Notification pour ${medication} à ${date.toLocaleTimeString()} déjà programmée.`);
        return;  
    }

    scheduledNotifications.push({
        id: notificationId,
        time: date.toLocaleTimeString(),
        medication: medication,
    });

    console.log("Date de la notification :", date);
    console.log("Données du trigger :", trigger);

    try {
        await notifee.createTriggerNotification(
            {
                title: 'C\'est l\'heure de votre traitement',
                body: `Il est l'heure de prendre votre ${medication}.`,
                android: {
                    channelId: 'default',
                    importance: AndroidImportance.HIGH,
                    visibility: AndroidVisibility.PUBLIC,
                    pressAction: {
                        id: 'default',
                        launchActivity: 'default',
                    },
                },
            },
            trigger
        );
    } catch (error) {
        console.error('Erreur lors de la création de la notification :', error);
    }
}
