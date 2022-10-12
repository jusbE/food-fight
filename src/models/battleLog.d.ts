interface BattleEvent {
  eventTime: string
  attacker: string
  defender: string
  damage: string
  defenderHealth: string
}

export interface BattleLog {
  timestamp: string
  fighter1: string
  fighter2: string
  winner: string
  events: BattleEvent[]
}
