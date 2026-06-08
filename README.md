# Randomizer
<b>Group Generator by Rating</b>
The app uses a serpentine draft algorithm with randomized distribution to ensure competitive balance:
Sort all participants by rating in descending order.
 This approach prevents stacking top-rated players in the same group while maintaining randomness within each tier.

<b>Core Features</b>
| Feature                | Description                                                              |
| ---------------------- | ------------------------------------------------------------------------ |
| **Manual Input**       | Add participants one by one with name and rating                         |
| **Spreadsheet Import** | Paste directly from Google Sheets/Excel with configurable column mapping |
| **Smart Validation**   | Real-time preview of group capacity vs. participant count                |
| **Tier Badges**        | Automatic classification (top / mid+ / mid- / new) based on percentile   |
| **Group Stats**        | Average rating displayed per group                                       |
| **Re-roll**            | One-click regeneration with new random seed                              |

<b>Usage</b>
Open group_generator.html in any modern browser
Add participants manually or paste from spreadsheet
Set desired number of groups and group size
Click Generate to create balanced groups
Click Repeat to reshuffle with the same participants