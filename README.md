# Facemash

<img src="/images/facemash.gif"/> 

Emulated the website from [The Social Network](https://www.imdb.com/title/tt1285016) to compare between two individuals, but with a twist — using actual farm animals instead of human profiles.

## Chess Player Ranking Algorithm (Elo Rating)

Given - $Base Rating: 1000$, $K: 32$

Probability of winning for Player A (left), $P_A$

$$P_A = \frac{1}{1 + 10^{(R_B - R_A)/400}}$$

Probability of winning for Player B (right), $P_B$

$$P_B = \frac{1}{1 + 10^{(R_A - R_B)/400}}$$

When Player A wins (left chosen):

```math
\text{leftRating} = \text{leftRating} + K \cdot (1 - P_A)\\
\text{rightRating} = \text{rightRating} + K \cdot (0 - P_B)
```

When Player B wins (right chosen):

```math
\text{leftRating} = \text{leftRating} + K \cdot (0 - P_A)\\
\text{rightRating} = \text{rightRating} + K \cdot (1 - P_B)
```

## How to Use
- Click on either side to increase image rating.
- Image ranking based on elo rating can be viewed by navigating to `Rankings`.
- Reopen page/tab to reset all image rating, refresh would not work.

## Development
1. Clone the repo by running `git clone https://github.com/Vincexodus/Facemash.git`.
2. Install [Live Server | VSCode Extension](https://ritwickdey.github.io/vscode-live-server/) and enable it.
3. On the bottom right of VSCode editor, click `Go Live`.
4. The site should be running on localhost.

## Contributing
1. Fork this repo.
2. Create your feature branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## References
- **The Social Network (2010)**. IMDB. Available at https://www.imdb.com/title/tt1285016
- **Elo Rating Algorithm**. GeeksforGeeks. Available at https://www.geeksforgeeks.org/elo-rating-algorithm/