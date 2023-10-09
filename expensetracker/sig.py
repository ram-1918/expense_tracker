# def solution(grid, shots):
#     def is_sunk(ship, attacked_cells):
#         # check if all cells of a ship are attacked
#         for cell in ship:
#             if cell not in attacked_cells:
#                 return False
#         return True

#     # Initialize result list and attacked cells set
#     result = []
#     attacked_cells = set()

#     # Find all cells occupied by each ship
#     ships = {}
#     for i in range(5):
#         for j in range(5):
#             if grid[i][j] != '.':
#                 if grid[i][j] in ships:
#                     ships[grid[i][j]].append((i, j))
#                 else:
#                     ships[grid[i][j]] = [(i, j)]

#     # Process each shot
#     for shot in shots:
#         x, y = shot
#         if grid[x][y] == '.':
#             result.append("Missed")
#         elif (x, y) in attacked_cells:
#             result.append("Already attacked")
#         else:
#             attacked_cells.add((x, y))
#             if is_sunk(ships[grid[x][y]], attacked_cells):
#                 result.append(f"Ship {grid[x][y]} sunk")
#             else:
#                 result.append(f"Attacked ship {grid[x][y]}")

#     return result

# # Example usage
# grid = [
#     ["-", "-", "A", "D", "E"],
#     ["-", "B", "A", "D", "E"],
#     ["C", "B", "A", "D", "E"],
#     ["C", ".", ".", ".", "."],
#     ["E", "E", "E", "E", "E"]
# ]

# grid1 = [
#     [".", "A", "B", "B", "B"],
#     [".", "A", ".", ".", "C"],
#     [".", ".", ".", ".", "."],
#     ["D", "D", ".", ".", "."],
#     [".", "E", "E", "E", "E"]
# ]
# shots = [[0, 0], [0, 1], [0, 2], [1, 1], [0, 1],
#          [1, 4], [2, 2], [2, 4], [0, 3], [0, 0], [0, 4]
#          ]
# print(solution(grid1, shots))

# raxccarz

# def func2():
#     return 2

# def square_decorator(func):
#     value = func()
#     return value**2

# result = square_decorator
# final_result = result(func2)



# @square_decorator
# def func1():
#     return 2

# print(func1)

    

# s = 'raxccarzt'

# def get_count(s):
#     count = 0
#     left, right = 0, len(s)-1
#     while left <= right:
#         if s[left] == s[right]:
#             left += 1
#             right -= 1
#             continue
#         if s[left] == s[right - 1]:
#             count += 1
#             left += 1
#             right -= 2
#         elif s[left + 1] == s[right]:
#             count += 1
#             left += 2
#             right -= 1
#         else:
#             return False
#     return count

# def is_one_deletion_away_from_palindrome(s):
#     count = get_count(s)
#     if count and count <= 1:
#         return True
#     return False

# print(is_one_deletion_away_from_palindrome(s))





