# Weather MCP Server Test Examples

This file contains a large collection of example `curl` commands you can run after cloning the repo and starting the server. The examples are grouped by type and cover many different cities, coordinates, forecast days, raw responses, and edge cases.

> Start your server first:
>
> ```bash
> npm install
> npm run dev
> ```
>
> Then run these commands in a separate terminal.

## 1. Current Weather by City

1. curl "http://localhost:3000/mcp/current?city=London"
2. curl "http://localhost:3000/mcp/current?city=Paris"
3. curl "http://localhost:3000/mcp/current?city=New%20York"
4. curl "http://localhost:3000/mcp/current?city=Tokyo"
5. curl "http://localhost:3000/mcp/current?city=Delhi"
6. curl "http://localhost:3000/mcp/current?city=Mumbai"
7. curl "http://localhost:3000/mcp/current?city=Sydney"
8. curl "http://localhost:3000/mcp/current?city=Moscow"
9. curl "http://localhost:3000/mcp/current?city=Cairo"
10. curl "http://localhost:3000/mcp/current?city=Rio%20de%20Janeiro"
11. curl "http://localhost:3000/mcp/current?city=Dubai"
12. curl "http://localhost:3000/mcp/current?city=Berlin"
13. curl "http://localhost:3000/mcp/current?city=Toronto"
14. curl "http://localhost:3000/mcp/current?city=Los%20Angeles"
15. curl "http://localhost:3000/mcp/current?city=Singapore"
16. curl "http://localhost:3000/mcp/current?city=Seoul"
17. curl "http://localhost:3000/mcp/current?city=Bangkok"
18. curl "http://localhost:3000/mcp/current?city=Mexico%20City"
19. curl "http://localhost:3000/mcp/current?city=Istanbul"
20. curl "http://localhost:3000/mcp/current?city=Amsterdam"

## 2. Forecast by City (3 days default)

21. curl "http://localhost:3000/mcp/forecast?city=London&days=3"
22. curl "http://localhost:3000/mcp/forecast?city=Paris&days=3"
23. curl "http://localhost:3000/mcp/forecast?city=New%20York&days=3"
24. curl "http://localhost:3000/mcp/forecast?city=Tokyo&days=3"
25. curl "http://localhost:3000/mcp/forecast?city=Delhi&days=3"
26. curl "http://localhost:3000/mcp/forecast?city=Mumbai&days=3"
27. curl "http://localhost:3000/mcp/forecast?city=Sydney&days=3"
28. curl "http://localhost:3000/mcp/forecast?city=Moscow&days=3"
29. curl "http://localhost:3000/mcp/forecast?city=Cairo&days=3"
30. curl "http://localhost:3000/mcp/forecast?city=Rio%20de%20Janeiro&days=3"

## 3. Forecast by City (1 to 5 days)

31. curl "http://localhost:3000/mcp/forecast?city=London&days=1"
32. curl "http://localhost:3000/mcp/forecast?city=London&days=2"
33. curl "http://localhost:3000/mcp/forecast?city=London&days=3"
34. curl "http://localhost:3000/mcp/forecast?city=London&days=4"
35. curl "http://localhost:3000/mcp/forecast?city=London&days=5"
36. curl "http://localhost:3000/mcp/forecast?city=Paris&days=1"
37. curl "http://localhost:3000/mcp/forecast?city=Paris&days=2"
38. curl "http://localhost:3000/mcp/forecast?city=Paris&days=3"
39. curl "http://localhost:3000/mcp/forecast?city=Paris&days=4"
40. curl "http://localhost:3000/mcp/forecast?city=Paris&days=5"

## 4. Current Weather by Coordinates

41. curl "http://localhost:3000/mcp/current?lat=51.5074&lon=-0.1278"  # London
42. curl "http://localhost:3000/mcp/current?lat=48.8566&lon=2.3522"   # Paris
43. curl "http://localhost:3000/mcp/current?lat=40.7128&lon=-74.0060" # New York
44. curl "http://localhost:3000/mcp/current?lat=35.6895&lon=139.6917" # Tokyo
45. curl "http://localhost:3000/mcp/current?lat=28.6139&lon=77.2090"  # Delhi
46. curl "http://localhost:3000/mcp/current?lat=19.0760&lon=72.8777"  # Mumbai
47. curl "http://localhost:3000/mcp/current?lat=-33.8688&lon=151.2093" # Sydney
48. curl "http://localhost:3000/mcp/current?lat=55.7558&lon=37.6173"  # Moscow
49. curl "http://localhost:3000/mcp/current?lat=30.0444&lon=31.2357"  # Cairo
50. curl "http://localhost:3000/mcp/current?lat=-22.9068&lon=-43.1729" # Rio de Janeiro

## 5. Forecast by Coordinates

51. curl "http://localhost:3000/mcp/forecast?lat=51.5074&lon=-0.1278&days=3"   # London
52. curl "http://localhost:3000/mcp/forecast?lat=48.8566&lon=2.3522&days=3"    # Paris
53. curl "http://localhost:3000/mcp/forecast?lat=40.7128&lon=-74.0060&days=3" # New York
54. curl "http://localhost:3000/mcp/forecast?lat=35.6895&lon=139.6917&days=3" # Tokyo
55. curl "http://localhost:3000/mcp/forecast?lat=28.6139&lon=77.2090&days=3"  # Delhi
56. curl "http://localhost:3000/mcp/forecast?lat=19.0760&lon=72.8777&days=3"  # Mumbai
57. curl "http://localhost:3000/mcp/forecast?lat=-33.8688&lon=151.2093&days=3" # Sydney
58. curl "http://localhost:3000/mcp/forecast?lat=55.7558&lon=37.6173&days=3"  # Moscow
59. curl "http://localhost:3000/mcp/forecast?lat=30.0444&lon=31.2357&days=3"  # Cairo
60. curl "http://localhost:3000/mcp/forecast?lat=-22.9068&lon=-43.1729&days=3" # Rio de Janeiro

## 6. Raw Payload Examples

61. curl "http://localhost:3000/mcp/current?city=London&raw=true"
62. curl "http://localhost:3000/mcp/current?city=Paris&raw=true"
63. curl "http://localhost:3000/mcp/forecast?city=London&days=3&raw=true"
64. curl "http://localhost:3000/mcp/forecast?city=Paris&days=3&raw=true"
65. curl "http://localhost:3000/mcp/current?lat=40.7128&lon=-74.0060&raw=true"
66. curl "http://localhost:3000/mcp/forecast?lat=40.7128&lon=-74.0060&days=4&raw=true"
67. curl "http://localhost:3000/mcp/current?city=Tokyo&raw=true"
68. curl "http://localhost:3000/mcp/forecast?city=Tokyo&days=5&raw=true"
69. curl "http://localhost:3000/mcp/current?lat=19.0760&lon=72.8777&raw=true"
70. curl "http://localhost:3000/mcp/forecast?lat=19.0760&lon=72.8777&days=2&raw=true"

## 7. Forecast Day Boundary Tests

71. curl "http://localhost:3000/mcp/forecast?city=London&days=1"
72. curl "http://localhost:3000/mcp/forecast?city=London&days=2"
73. curl "http://localhost:3000/mcp/forecast?city=London&days=3"
74. curl "http://localhost:3000/mcp/forecast?city=London&days=4"
75. curl "http://localhost:3000/mcp/forecast?city=London&days=5"
76. curl "http://localhost:3000/mcp/forecast?city=London&days=6"  # should clamp to 5
77. curl "http://localhost:3000/mcp/forecast?city=London&days=0"  # should clamp to 1
78. curl "http://localhost:3000/mcp/forecast?city=London&days=-1" # should clamp to 1
79. curl "http://localhost:3000/mcp/forecast?city=London&days=abc" # invalid days fallback to default 3
80. curl "http://localhost:3000/mcp/forecast?city=London"      # default days

## 8. Error and Validation Checks

81. curl "http://localhost:3000/mcp/current"
82. curl "http://localhost:3000/mcp/forecast"
83. curl "http://localhost:3000/mcp/current?lat=100&lon=0"          # invalid latitude
84. curl "http://localhost:3000/mcp/current?lat=0&lon=200"          # invalid longitude
85. curl "http://localhost:3000/mcp/forecast?lat=100&lon=0&days=3"  # invalid coordinates
86. curl "http://localhost:3000/mcp/current?city=ThisCityDoesNotExist12345"
87. curl "http://localhost:3000/mcp/forecast?city=ThisCityDoesNotExist12345&days=3"
88. curl "http://localhost:3000/mcp/current?city="
89. curl "http://localhost:3000/mcp/forecast?city=&days=2"
90. curl "http://localhost:3000/mcp/current?lat=abc&lon=def"

## 9. City Name Variations and Spaces

91. curl "http://localhost:3000/mcp/current?city=San%20Francisco"
92. curl "http://localhost:3000/mcp/current?city=Buenos%20Aires"
93. curl "http://localhost:3000/mcp/current?city=Sao%20Paulo"
94. curl "http://localhost:3000/mcp/current?city=Ciudad%20de%20Mexico"
95. curl "http://localhost:3000/mcp/current?city=Ho%20Chi%20Minh%20City"
96. curl "http://localhost:3000/mcp/current?city=Kuala%20Lumpur"
97. curl "http://localhost:3000/mcp/current?city=Buenos%20Aires&raw=true"
98. curl "http://localhost:3000/mcp/forecast?city=San%20Francisco&days=4"
99. curl "http://localhost:3000/mcp/forecast?city=Ho%20Chi%20Minh%20City&days=2"
100. curl "http://localhost:3000/mcp/current?city=Mexico%20City"

## 10. Additional Mixed Examples

101. curl "http://localhost:3000/mcp/forecast?city=Amsterdam&days=5"
102. curl "http://localhost:3000/mcp/current?city=Barcelona"
103. curl "http://localhost:3000/mcp/forecast?city=Rome&days=2"
104. curl "http://localhost:3000/mcp/current?city=Athens"
105. curl "http://localhost:3000/mcp/forecast?city=Lisbon&days=3"
106. curl "http://localhost:3000/mcp/current?city=Jakarta"
107. curl "http://localhost:3000/mcp/forecast?city=Seoul&days=4"
108. curl "http://localhost:3000/mcp/current?city=Bangalore"
109. curl "http://localhost:3000/mcp/forecast?city=Chicago&days=1"
110. curl "http://localhost:3000/mcp/current?city=San%20Diego&raw=true"
111. curl "http://localhost:3000/mcp/current?lat=37.7749&lon=-122.4194"  # San Francisco coords
112. curl "http://localhost:3000/mcp/forecast?lat=35.6762&lon=139.6503&days=5" # Tokyo coords
113. curl "http://localhost:3000/mcp/current?lat=34.0522&lon=-118.2437" # Los Angeles coords
114. curl "http://localhost:3000/mcp/forecast?lat=52.5200&lon=13.4050&days=3"  # Berlin coords
115. curl "http://localhost:3000/mcp/current?lat=41.9028&lon=12.4964"   # Rome coords
116. curl "http://localhost:3000/mcp/forecast?lat=59.3293&lon=18.0686&days=2"  # Stockholm coords
117. curl "http://localhost:3000/mcp/current?lat=45.4642&lon=9.1900"    # Milan coords
118. curl "http://localhost:3000/mcp/forecast?lat=39.9042&lon=116.4074&days=4" # Beijing coords
119. curl "http://localhost:3000/mcp/current?city=Cape%20Town"
120. curl "http://localhost:3000/mcp/forecast?city=Reykjavik&days=3"

## Notes

- Use URL-encoding for spaces and special characters in city names.
- Some locations may return multiple matches from OpenWeatherMap geocoding.
- If you want raw payloads, add `&raw=true` to the URL.
- Forecast days are clamped between `1` and `5`.

Happy testing!
EOF