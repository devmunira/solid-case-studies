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

**Background:** An e-commerce platform calculates taxes based on the customer's location. Initially, it supports tax calculations for a few regions (e.g., state, federal, international) with specific rules. As the platform expands, it needs to add more location-specific tax rules without altering the existing logic for current locations.

**Question:** How would you implement the tax calculation system to allow new location-based tax rules to be added without modifying the original tax classes?

---

### Document Processing Tools

**Background:** A document processing tool converts documents between various formats (e.g., PDF, Word, HTML). As user demands increase, the tool needs to support additional formats, such as XML, JSON, or even audio formats. These new conversions must be added without modifying the existing code that handles current formats.

**Question:** How would you design the document conversion tool to allow new format conversions to be added without altering the existing conversion logic?

## Level II Case Studies

### Spacecraft Command System (Inspired by NASA)

**Background:** Design a system that handles commands sent to spacecraft. Commands differ depending on the target (rover, satellite, lander) and evolve with mission types. Some commands are timed, others are immediate. All commands must be logged, validated, and simulated before execution.

**Questions:**

- What are your abstractions for "command", "target", and "execution"?
- How do you ensure new spacecraft types can be added without modifying the system?
- How do you isolate logging and validation?
- What interfaces would you create?

---

### Dynamic Pricing Engine for Finance

**Background:** Design a pricing engine for derivatives that supports different asset classes (options, swaps, futures). Pricing algorithms vary greatly and depend on external data feeds. Each algorithm has its own validation, audit trail, and caching strategy.

**Questions:**

- How do you define pricing behavior without hardcoding it?
- How do you plug in different audit or caching strategies without tight coupling?
- How do you support composable pricing logic?

---

### Multiplayer Game Event System

**Background:** Design a system to manage game events (player hit, item collected, enemy spawned). Events may trigger other events. Developers should be able to add custom event listeners for analytics, balancing, or player behavior tracking.

**Questions:**

- What classes/interfaces would you create for events and event listeners?
- How do you prevent event explosions in code?
- How can new events or subscribers be added without modifying core systems?

---

### Logistics Delivery Routing System

**Background:** Design a system that calculates delivery routes. Different delivery types (express, standard, refrigerated) have different constraints. Constraints may be added dynamically (e.g., "avoid toll roads", "skip construction zones"). Multiple algorithms (Dijkstra, A\*, Genetic) are used based on cost/need.

**Questions:**

- How do you abstract route generation and constraints?
- How would you structure the constraint system so it's extensible at runtime?
- How do you plug in new algorithms without modifying existing code?

---

### Digital Publishing Workflow

**Background:** A large publishing house is building a digital workflow for content creation, editing, and distribution. Articles go through different stages: drafted, reviewed, approved, translated, and published. Each stage may involve different roles (e.g., editor, legal reviewer, translator), and some articles may bypass certain steps based on their category.

**Questions:**

- How would you model the state transitions and roles in the publishing pipeline?
- What design choices support adding a new step like fact-checking without modifying existing logic?
- How do you enforce responsibility separation between state management and action execution?

---

### Distributed Job Scheduler

**Background:** You are building a distributed job scheduler that runs various types of jobs (data sync, report generation, ML retraining). Each job has specific runtime requirements, failure strategies (retry, alert, escalate), and resource needs. The scheduler must support plug-in job types and logging/auditing.

**Questions:**

- How do you abstract job types and lifecycle stages (ready, running, failed)?
- How do you ensure that each job's error handling and logging is handled in a SOLID-compliant way?
- How would you enable new job types with minimal impact on the scheduler core?

---

### Modular CRM System

**Background:** A CRM platform is used by businesses of various sizes. It includes modules like contacts, deals, marketing, and support. Different companies use different combinations, and each module integrates with external APIs (e.g., email marketing, ticketing).

**Questions:**

- How would you architect the CRM to allow modular, plug-and-play components?
- How would you apply Interface Segregation for module-specific interfaces?
- How do you ensure that each module adheres to SRP and can evolve independently?

---

### Content Moderation Engine

**Background:** You're tasked with building a moderation engine for a social media platform. It should handle text, images, and video posts. Moderation rules vary by region and content type. Rules must be updated dynamically and applied without system downtime.

**Questions:**

- How would you abstract content types and rule engines?
- What approach ensures you can update rules or support a new media type without touching existing logic?
- How do you separate moderation logic from reporting and escalation workflows?

---

### IoT Fleet Management System

**Background:** An enterprise is managing thousands of IoT devices deployed in smart cities—ranging from traffic lights to pollution sensors. Devices send data in different formats, require firmware updates, and support remote diagnostics. The system must scale and adapt to new device types easily.

**Questions:**

- How would you structure device types and their communication protocols?
- What abstractions support firmware update and diagnostics logic while keeping them separate?
- How would you onboard new device types without violating OCP?

---

### Regulatory Form Submission Engine

**Background:** You're developing a system that enables multiple clients (banks, insurance, healthcare) to submit regulated forms to government authorities. Each form has strict validation, pre-processing, transformation rules, and varies per regulation and jurisdiction. Clients must be able to add custom processing logic without altering the core engine.

**Questions:**

- How do you model the form types and submission flows?
- How would you decouple validation, transformation, and dispatch?
- How would clients add new custom behaviors without modifying your core?

---

### Plugin-Based Static Site Generator

**Background:** You're creating a static site generator that allows plugins for markdown processing, syntax highlighting, SEO injection, etc. Plugins may change headers, inject scripts, or modify structure. Some plugins depend on others or modify output order.

**Questions:**

- How do you architect the plugin system with dependency resolution?
- How do you enforce SRP for plugins without restricting functionality?
- How do you enable plugin ordering and chaining cleanly?

---

### Policy-Based Access Control Engine

**Background:** You're developing an access control engine where access decisions are based on dynamic policies (RBAC, ABAC, IP-based, time-based). Each policy can be composed and evaluated at runtime. Policies evolve frequently and must be testable in isolation.

**Questions:**

- How would you abstract policy types and their composition?
- How do you support plug-and-play policy modules?
- How do you enable testability and single responsibility per policy?

---

### Online Judge System (Like LeetCode)

**Background:** You're building a system that runs code submissions in multiple languages (Python, Java, C++) against test cases. Execution requires security sandboxing, resource limits, and result verification.

**Questions:**

- How would you model language runners and test cases?
- How do you handle post-processing (e.g., formatting errors, logs)?
- How do you structure runners so new languages can be added without breaking SRP?

---

### Cloud Billing Engine

**Background:** A cloud provider needs a billing engine that meters usage of compute, storage, and network services. Each service has different pricing models, discounts, taxes, and invoice rules. Customers also need usage forecasting.

**Questions:**

- What abstractions do you define for services and metering rules?
- How do you structure billing, forecasting, and invoicing separately?
- How do you support new services with different pricing models?

---

### Automated Code Review System

**Background:** You're building a tool that reviews code PRs for issues like bad practices, security flaws, performance, and formatting. Review rules vary per language and organization.

**Questions:**

- How do you abstract rules and language-specific analyzers?
- How would you separate scanning, reporting, and feedback logic?
- How do you enable rule configurability without hardcoding them?

---

### Banking Transaction Engine

**Background:** You're designing a core banking transaction engine that handles different transaction types: transfer, withdrawal, loan disbursement, etc. Each transaction has unique validation, posting logic, and rollback requirements.

**Questions:**

- How do you ensure SRP for transaction validation vs posting?
- How do you isolate logic per transaction type and avoid conditionals?
- What's your strategy for testability and audit logging?

---

### Custom Workflow Orchestration Tool

**Background:** You are building a workflow engine where users define workflows as sequences of tasks (email, approval, delay, API call). Workflows can have conditions, retries, and branching logic. Tasks must be reusable.

**Questions:**

- How would you define tasks, workflows, and transitions?
- How do you isolate task logic from orchestration?
- How would you support new task types or triggers?

---

### Medical Diagnostic Assistant

**Background:** Design a rule-based diagnostic assistant for doctors. Rules differ by specialization (cardiology, dermatology) and evolve over time. The assistant suggests potential diagnoses based on symptoms and patient history.

**Questions:**

- How do you organize rules per specialization?
- How do you update rules without modifying diagnostic flow?
- How would you support region-specific compliance rules?

---

### Tax Calculation Platform

**Background:** A SaaS platform calculates tax for multiple countries and states. Each region has its own tax slabs, exceptions, and discounts. Rules change frequently and vary per product category.

**Questions:**

- How do you separate tax rules from core calculation engine?
- How do you ensure new jurisdictions don't break the system?
- How would you apply DIP for external tax data providers?

---

### SaaS Billing Subscription Engine

**Background:** You are building a system for managing subscriptions with trials, upgrades, downgrades, pauses, and metered usage. Plans vary per client and require integration with external payment gateways.

**Questions:**

- What abstractions support dynamic billing and subscription logic?
- How do you model state transitions (trial → active → paused → canceled)?
- How would you handle vendor-specific payment logic via DIP?

---

### AI-Based Personal Assistant

**Background:** An AI assistant integrates with calendars, email, reminders, and third-party tools. It can be voice-activated or chat-based. Each integration (e.g., Google Calendar, Outlook, Slack) has distinct APIs and auth flows.

**Questions:**

- How do you abstract integrations while adhering to OCP?
- How do you separate voice and chat interfaces without duplicating logic?
- How would you use ISP and DIP for handling third-party APIs?
