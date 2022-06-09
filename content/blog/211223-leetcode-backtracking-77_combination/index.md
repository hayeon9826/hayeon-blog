---
title: '[Backtracking] Leetcode 77. Combination'
date: "2021-12-23T22:40:32.169Z"
description: 백트래킹(backtracking)이란? 해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법을 말한다.
category: "Algorithm"
---

<img src="https://velog.velcdn.com/images/khy226/post/9d989682-4811-4122-bdff-31d68048563e/leetcode_logo.001.jpeg" style="width: 60%; padding-bottom: 50px;">



## Backtracking 이란?

**백트래킹(backtracking)이란?**

해를 찾는 도중 해가 아니어서 막히면, 되돌아가서 다시 해를 찾아가는 기법을 말한다. 최적화 문제와 결정 문제를 푸는 방법이다. 대표적인 문제로 `n-queens` 문제가 있다. 이를 가지치기라고 하는데, 불필요한 부분을 쳐내고 최대한 올바른 쪽으로 간다는 뜻이다.

> - 즉, 백트래킹은 모든 가능한 경우의 수 중에서 **특정한 조건을 만족하는 경우만** 살펴보는 것이다.
- 답이 될 만한지 판단하고 그렇지 않으면 그 부분까지 탐색하는 것을 하지 않고 **가지치기** 하는 것이다.
- 주로 문제 풀이에서는 **DFS** 등으로 모든 경우의 수를 탐색하는 과정에서, 조건문 등을 걸어 답이 절대로 될 수 없는 상황을 정의하고, 그러한 상황일 경우에는 탐색을 중지시킨 뒤 **그 이전으로 돌아가서 다시 다른 경우를 탐색하게**끔 구현할 수 있다.
출처: [알고리즘 - 백트래킹(Backtracking)의 정의 및 예시문제](https://chanhuiseok.github.io/posts/algo-23/)


## 문제
문제 링크: [Leetcode - 77.Combinations](https://leetcode.com/problems/combinations/)

### 77. Combinations

Given two integers n and k, return all possible combinations of k numbers out of the range [1, n].
You may return the answer in any order.

**Example 1:**

```python
Input: n = 4, k = 2
Output:
[
[2,4],
[3,4],
[2,3],
[1,2],
[1,3],
[1,4],
]
```

**Example 2:**

```python
Input: n = 1, k = 1
Output: [[1]]
```

**Constraints:**

- 1 <= n <= 20
- 1 <= k <= n


## 풀이

**1. 백트래킹을 이용한 풀이**
```python
# backtracking
class Solution:
    def combine(self, n: int, k: int) -> List[List[int]]:
        solution = []

        def backtrack(k, combination, next):
            if k == 0:
              # 3. 만약 combination 안에 숫자가 k개 다 찾다면, 해당 combination을 solution 배열에 넣는다.
                solution.append(combination.copy())
            else:
                for i in range(next, n + 1):
                    # 1. combination에 테스트할 숫자를 넣어준다. 숫자 하나 들어갈때 마다 총 숫자 (k) 를 하나씩 줄인다.
                    combination.append(i)
                    # 2. next 값인 i 를 하나 올려서 다시 backtracking 시작
                    backtrack(k - 1, combination, i + 1)
                    # 4. k == 0 까지 갔다면, combination 마지막에 있던 숫자를 빼고 새로운 숫자 넣고 다시 시작한다.
                    combination.pop()
        
        backtrack(k, [], 1)
        return solution
```



**2. 라이브러리를 이용한 풀이**

```python
# python combination 라이브러리 사용
from itertools import combinations

class Solution:
    def combine(self, n, k):
        return list(combinations(range(1, n+1), k))

```

## 참고
> - https://chanhuiseok.github.io/posts/algo-23/
> - https://hyoeun-log.tistory.com/124
