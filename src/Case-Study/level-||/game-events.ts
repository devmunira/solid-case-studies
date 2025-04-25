// Design a system to manage game events (player hit, item collected, enemy spawned). Events may trigger other events. Developers should be able to add custom event listeners for analytics, balancing, or player behavior tracking.

// Question:
// What classes/interfaces would you create for events and event listeners?
// How do you prevent event explosions in code?
// How can new events or subscribers be added without modifying core systems?

enum EventType {
  PLAYER_HIT = "PLAYER_HIT",
  ITEM_COLLECTED = "ITEM_COLLECTED",
  ENEMY_SPAWNED = "ENEMY_SPAWNED",
}

interface IGameEventObserver {
  eventType: EventType;
  eventFire(): void;
}

class PlayerHit implements IGameEventObserver {
  eventType: EventType = EventType.PLAYER_HIT;

  eventFire(): void {
    console.log("Player hit event fired");
  }
}

class ItemCollected implements IGameEventObserver {
  eventType: EventType = EventType.ITEM_COLLECTED;
  eventFire(): void {
    console.log("Item collected event fired");
  }
}

class EnemySpawned implements IGameEventObserver {
  eventType: EventType = EventType.ENEMY_SPAWNED;
  eventFire(): void {
    console.log("Enemy spawned event fired");
  }
}

class GameEventObserver {
  private observers: Map<EventType, Set<IGameEventObserver>> = new Map();
  constructor() {
    Object.values(EventType).forEach((event) =>
      this.observers.set(event, new Set())
    );
  }

  public attach(observer: IGameEventObserver) {
    const ob = this.observers.get(observer.eventType);
    if (ob) {
      ob.add(observer);
    }
  }

  public detach(observer: IGameEventObserver) {
    const ob = this.observers.get(observer.eventType);
    if (ob) {
      this.observers.delete(observer.eventType);
    }
  }

  triggerObservers(eventType: EventType[]) {
    eventType.forEach((event) => {
      const observers = this.observers.get(event);
      if (observers) {
        for (const ob of observers) {
          ob.eventFire();
        }
      }
    });
  }
}

// Example game scenario
class Game {
  private eventObserver: GameEventObserver;
  private playerHealth: number = 100;
  private score: number = 0;

  constructor() {
    this.eventObserver = new GameEventObserver();

    // Attach event observers
    this.eventObserver.attach(new PlayerHit());
    this.eventObserver.attach(new ItemCollected());
    this.eventObserver.attach(new EnemySpawned());
  }

  // Simulate player taking damage
  playerTakeDamage(damage: number) {
    this.playerHealth -= damage;
    console.log(`Player health: ${this.playerHealth}`);
    this.eventObserver.triggerObservers([EventType.PLAYER_HIT]);
  }

  // Simulate collecting an item
  collectItem() {
    this.score += 10;
    console.log(`Score: ${this.score}`);
    this.eventObserver.triggerObservers([EventType.ITEM_COLLECTED]);
  }

  // Simulate enemy spawning
  spawnEnemy() {
    console.log("Enemy has spawned!");
    this.eventObserver.triggerObservers([EventType.ENEMY_SPAWNED]);
  }
}

// Example usage
const game = new Game();
game.playerTakeDamage(20);
game.collectItem();
game.spawnEnemy();
