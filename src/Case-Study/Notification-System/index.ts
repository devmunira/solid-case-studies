type NotificationContext = {
  message: string;
  recipient: string;
};

interface Notification {
  send({ recipient, message }: NotificationContext): void;
}

class SMSNotification implements Notification {
  send({ recipient, message }: NotificationContext) {
    console.log(`Sending SMS to ${recipient}: ${message}`);
  }
}

class EmailNotification implements Notification {
  send({ recipient, message }: NotificationContext) {
    console.log(`Sending Email to ${recipient}: ${message}`);
  }
}

class PushNotification implements Notification {
  send({ recipient, message }: NotificationContext) {
    console.log(`Sending Push Notification to ${recipient}: ${message}`);
  }
}

class NotificationFactory {
  static createNotification(type: string) {
    switch (type) {
      case "SMS":
        return new SMSNotification();
      case "Email":
        return new EmailNotification();
      case "Push":
        return new PushNotification();
      default:
        throw new Error("Unsupported notification type");
    }
  }
}

const smsNotifier = NotificationFactory.createNotification("SMS");
smsNotifier.send({ recipient: "+1234567890", message: "Hello via SMS!" });

const emailNotifier = NotificationFactory.createNotification("Email");
emailNotifier.send({
  recipient: "user@example.com",
  message: "Hello via Email!",
});

const pushNotifier = NotificationFactory.createNotification("Push");
pushNotifier.send({
  recipient: "device123",
  message: "Hello via Push Notification!",
});
