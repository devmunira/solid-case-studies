## Software Design Questions

### REST API for User Authentication and CSV Upload

**Background:** You need to build a REST API where a user can log in and log out. Users can upload a CSV file with keywords. With each keyword, the software should perform a Google search via a network call. The results from the network call should be stored in a database.

**Question:** What are the classes you might need in this software solution?

---

### Payroll System

**Background:** A payroll system calculates salaries for different employee types. A general `Employee` class calculates salary based on hours worked, while `ContractEmployee` (a derived class) might have a different payment calculation, like a fixed contract rate. The payroll system processes all employee types and expects consistent results. In the future, more salary calculation logic may be required.

**Question:** How would you design the `Employee` and `ContractEmployee` classes to ensure the payroll system handles both without needing special conditions?

---

### Event Management System

**Background:** An event management system allows users to view available events, make reservations, pay for tickets, and receive notifications. Each event has specific seat allocations, which need real-time updates. Cancellations should be handled with refund options, and users must be notified of successful reservations or cancellations.

**Question:** What are the classes you might need in this software solution?

---

### Media Player

**Background:** A media player handles different media types like audio and video files. It has a `MediaFile` base class with common methods (`play`, `pause`, `stop`), while `AudioFile` and `VideoFile` subclasses may have additional needs (e.g., subtitles for video). The player should manage any file type seamlessly without extra conditions.

**Question:** How would you structure the `MediaFile`, `AudioFile`, and `VideoFile` classes so the player works consistently with all file types?

---

### Online Store Backend

**Background:** An online store needs a backend to handle order placement, track payment, and manage shipment information. Each order involves checking inventory, processing payments, and updating shipment status. The system should also notify customers of order status changes and generate invoices for each order.

**Question:** What are the classes you might need in this software solution?

---

### Vehicle Tracking System

**Background:** A vehicle tracking system calculates the speed for various vehicle types (e.g., bikes, cars, airplanes). The base `Vehicle` class defines basic speed-related methods, and subclasses such as `Bike`, `Car`, and `Airplane` may need different speed limit handling. The system should calculate speeds consistently across all vehicle types.

**Question:** How would you design the `Vehicle` and its subclasses to allow consistent speed calculations without needing different handling for each type?

---

### E-Commerce Data Persistence

**Background:** An e-commerce system stores order data in a SQL database. Later, there may be a need to switch to a NoSQL database or another storage method for scalability. The high-level order processing logic should remain unaffected by these changes.

**Question:** How would you structure the data persistence layer for order data so that the core order processing logic can work with any storage type without modification?

---

### Payment Processing System

**Background:** A payment processing system handles different types of transactions. Credit card payments require additional verification, such as CVV and expiry date checks, while bank transfers need account number validation. Digital wallets only need an email or phone number for verification. The payment interface should not impose methods that are irrelevant to each payment type.

**Question:** How would you design interfaces?

---

### Discount Calculation System

**Background:** An e-commerce platform applies different discounts based on promotions or customer segments (e.g., seasonal discounts, loyalty discounts, bulk purchase discounts). The marketing team frequently introduces new types of discounts. The system should allow adding new discount types without modifying the code for existing discounts.

**Question:** How would you design the discount calculation system so that new discount types can be introduced without changing the existing discount logic?

---

### Product Management in E-Commerce

**Background:** An e-commerce platform manages products with various types, such as physical goods, digital downloads, and services. Physical goods need methods for shipping, inventory tracking, and delivery, while digital products only require download and licensing methods. Service-based products may need scheduling functionality. The product interface should avoid imposing irrelevant methods on different product types.

**Question:** How would you design interfaces for these different product types?

---

### Logging System Design

**Background:** A web application requires logging for various events, initially using a specific logging library. However, there might be a need to replace or extend the logging system in the future (e.g., to support a cloud-based logging service or custom logging formats).

**Question:** How would you design the logging system to allow easy replacement or addition of different logging implementations without modifying the main application logic?

---

### Payment Method Handling

**Background:** An online store supports various payment types through a `PaymentMethod` class. Some payment types, like `BankTransfer` or `DigitalWallet`, may need additional information to complete the payment. The store expects to handle any payment method uniformly without unexpected errors.

**Question:** How would you design the `PaymentMethod` and its subclasses so that the store can process any payment type seamlessly?

---

### Payment Gateway Integration

**Background:** An online store processes payments using a specific payment gateway (e.g., PayPal). The store might later integrate additional payment providers or switch to another gateway entirely. The payment processing logic should not rely directly on any specific payment provider.

**Question:** How would you design the payment processing module so that it can handle different payment gateways without altering the main payment logic?

---

### Multi-Functional Printer

**Background:** A multi-functional printer can print, scan, copy, and fax. However, some models are simpler and only support printing and scanning, while others support all four functions. The printer's interface should not force simpler models to implement unnecessary methods.

**Question:** How would you design interfaces for the printer functions?

---

### Authentication System

**Background:** An application initially uses a local database for user authentication. Later, it might switch to an external identity provider, such as OAuth or SAML. The core authentication and authorization logic should remain unaffected by the change in authentication providers.

**Question:** How would you design the authentication module so that it can integrate different authentication providers without needing to modify the main authentication logic?

---

### Payment Gateway Processing

**Background:** A payment gateway processes various types of transactions—such as credit, debit, and digital wallets—for e-commerce sites. It must validate transaction details, communicate with banks, log transactions, and send confirmation or error responses. The platform also requires fraud detection and report generation for each transaction type.

**Question:** What are the classes you might need in this software solution?

---

### Notification System

**Background:** A notification system sends different types of notifications, such as SMS, email, and push notifications. Each type has specific requirements (e.g., SMS requires a phone number, while email requires an email address). The notification interface should avoid requiring any one notification type to provide unnecessary information or implement irrelevant methods.

**Question:** How would you design the interfaces for notifications?

---

### Inventory Management

**Background:** A warehouse needs an automated inventory system to manage items stored across various locations. The system must track item quantities, update stock levels when items are added or removed, and notify warehouse staff when inventory is low or restocked. The system will also generate reports on stock movements and item status.

**Question:** What are the classes you might need in this software solution?

---

### Tax Calculation System

**Background:** An e-commerce platform calculates taxes based on the customer’s location. Initially, it supports tax calculations for a few regions (e.g., state, federal, international) with specific rules. As the platform expands, it needs to add more location-specific tax rules without altering the existing logic for current locations.

**Question:** How would you implement the tax calculation system to allow new location-based tax rules to be added without modifying the original tax classes?
