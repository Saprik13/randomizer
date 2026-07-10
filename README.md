# Randomizer

<b>Group Generator by Rating</b>
A clean, client-side web tool for randomly distributing participants into balanced groups

<b>What it does</b>

- **Import from Google Sheets** — paste data directly from spreadsheets
- **Balanced grouping** — uses participant ratings to distribute evenly across teams
- **Flexible setup** — define either number of groups or participants per group
- **Fully client-side** — no data leaves your browser

<b>How to use</b>

1. Open the [live app](https://saprik13.github.io/randomizer/)
2. Paste your participant list from Google Sheets
3. Select the name column and rating column
4. Choose your grouping strategy (by group count or group size)
5. Get your randomized distribution instantly

## How the algorithm works

The generator uses **rating-aware serpentine seeding**. Its goal is to keep
the groups close in strength while preserving predictable group sizes.

1. **Sort by rating.** Participants are ordered from the highest rating to
   the lowest. The original input order is preserved when ratings are equal.
2. **Calculate group capacities.** Every group receives
   `floor(players / groups)` slots. Any remaining slots are distributed so
   that Group 1 receives the first extra slot. The next extra slots go to
   Groups 3, 4, and so on, keeping Group 1 larger than Group 2 whenever the
   player count is not divisible by the group count.
3. **Build the serpentine route.** The target group moves forward through the
   list of groups and then backward, skipping groups whose capacity is already
   full.
4. **Seed participants.** The sorted participants are assigned along this
   route. Because the route always starts with Group 1, the highest-rated
   participant is always placed in Group 1.
5. **Generate repeat variants.** The initial result uses the reference
   serpentine seed. Each click on **Repeat** advances to the next variant. A
   non-reference variant swaps one adjacent rating pair whose participants
   belong to different groups; after all valid swaps, the cycle returns to the
   reference seed. The highest-rated participant is never moved. Since only
   neighboring ratings are exchanged, the group composition changes while the
   strength balance stays close to the reference seed.

### Example

For 7 participants and 2 groups, the reference rating ranks are distributed
as follows:

- **Group 1:** 1, 4, 5, 7 — 4 participants
- **Group 2:** 2, 3, 6 — 3 participants

The participant ranked `1` is in Group 1, and the first group receives the
extra participant.

### Guarantees

- The highest-rated participant is always in Group 1.
- Group sizes differ by no more than one participant.
- When the division has a remainder, Group 1 is larger than Group 2.
- Repeat variants preserve group capacities and only exchange neighboring
  rating positions.

The dominant operation is sorting, so the time complexity is `O(n log n)`;
the additional memory usage is `O(n + g)`, where `n` is the number of
participants and `g` is the number of groups.
