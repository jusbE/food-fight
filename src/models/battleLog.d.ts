interface BattleEvent {
  eventTime: string
  attacker: string
  attackerLink: string
  defender: string
  defenderLink: string
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
