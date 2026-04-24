# My Entities Card

A custom Home Assistant Lovelace card that displays 10 entities in a responsive grid.

## Installation

### HACS
1. Open HACS.
2. Go to Frontend.
3. Add this repository as a custom repository if needed.
4. Install the card.

### Manual
1. Copy `my-entities-card.js` to your Home Assistant `www` folder.
2. Add it as a resource in Home Assistant.
3. Use `type: custom:my-entities-card` in Lovelace.

## Example

```yaml
type: custom:my-entities-card
title: My 10 Entities
entities:
  - light.living_room
  - switch.kitchen
  - sensor.temperature_1
  - sensor.temperature_2
  - binary_sensor.door
  - lock.front_door
  - climate.bedroom
  - light.hallway
  - sensor.humidity
  - switch.garage
