# Randomizer

<b>Group Generator by Rating</b>

The app uses deterministic serpentine seeding to ensure competitive balance:
participants are sorted by rating and assigned to groups in alternating forward
and reverse order. The highest-rated player always starts in Group 1. Group sizes
differ by at most one; when the player count cannot be divided evenly, Group 1 is
larger than Group 2.

<b>Core Features</b>

| Feature                | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| **Manual Input**       | Add participants one by one with name and rating                         |
| **Spreadsheet Import** | Paste directly from Google Sheets/Excel with configurable column mapping |
| **Smart Validation**   | Real-time preview of group capacity vs. participant count                |
| **Tier Badges**        | Automatic classification (top / mid+ / mid- / new) based on percentile   |
| **Group Stats**        | Average rating displayed per group                                       |
| **Regenerate**         | One-click regeneration after changing participants or settings           |

<b>Usage</b>

Open `index.html` in any modern browser, add participants manually or paste them
from a spreadsheet, set the group count and size, then click **Generate**.
