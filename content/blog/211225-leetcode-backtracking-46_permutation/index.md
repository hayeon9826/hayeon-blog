---
title: '[LeetCode] Backtracking 을 이용한 순열 구하기'
date: "2021-12-25T22:40:32.169Z"
description: '백트래킹(backtracking)이란? : 한정 조건을 가진 문제를 푸는 전략이다. 해를 찾는 도중 해당 경로에서 해가 나오지 않고 막히면, 되돌아가서 다른 경로에서 해를 찾아가는 기법을 말한다.'
---

<img src="https://velog.velcdn.com/images/khy226/post/b010e294-29eb-4e7e-a32c-ab5918be5761/leetcode_logo.001.jpeg" style="width: 60%; padding-bottom: 50px;">



## Backtracking

**백트래킹(backtracking)이란?** : 한정 조건을 가진 문제를 푸는 전략이다. 해를 찾는 도중 해당 경로에서 해가 나오지 않고 막히면, 되돌아가서 다른 경로에서 해를 찾아가는 기법을 말한다. 

### 구현 방법
- 주요 개념은 **해를 얻을 때까지 모든 가능성을 시도한다**는 것이다. 
- 모든 가능성은 하나의 트리처럼 구성할 수 있으며, 여러 가지 중에 해결책이 있다. 
- 트리를 검사하기 위해 **깊이 우선 탐색(DFS)**을 사용한다. 탐색 중에 오답을 만나면 **이전 분기점**으로 돌아간다. 시도해보지 않은 다른 해결 방법이 있으면 시도한다. 
 - 해결 방법이 더 없으면 더 이전의 분기점으로 돌아간다. 모든 트리의 노드를 검사해도 답을 못 찾을 경우, 이 문제의 해결책은 없는 것으로 결론이 난다.
 
> 출처: [퇴각검색 - 위키백과](https://ko.wikipedia.org/wiki/%ED%87%B4%EA%B0%81%EA%B2%80%EC%83%89)


<hr>

### 문제

#### [46. Permutations](https://leetcode.com/problems/permutations/)

Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.
해석: 모든 순열의 경우의 수를 구하라.
> **순열(Permutation)이란? **
서로 다른 n개 중에 n개를 모두 선택하는 경우의 수를 의미한다. **순서**가 다르면 다른 경우의 수로 본다.
예를 들어 [1, 2, 3] 이라는 배열이 있다면 서로 다른 순열의 경우의 수는 총 `3!`인 여섯 가지가 나온다. `[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]`

**Example 1:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**

```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**

- 1 <= nums.length <= 6
- -10 <= nums[i] <= 10
- All the integers of nums are unique.

### 풀이

```python
class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        result = []
        self.dfs(nums, [], result)
        return result
        
    def dfs(self, nums, path, solution):
      # 만약 nums 배열에 아무 원소도 없다면, path 배열에 모든 원소가 이동되었다는 뜻.
      # 따라서 해당 path 배열을 정답 (result) 배열에 추가한다. 
      # deep copy로 추가
        if len(nums) == 0:
            result.append(path[:])
            return
            # backtracking
        else:
            for i in range(len(nums)):
              # nums 배열에서 n 번째 숫자를 제거하고, temp 배열에 추가한다
                self.dfs(nums[:i]+nums[i+1:], path+[nums[i]], result)
```


<hr> 

### 풀이 해설

**Example1**의 예시를 가지고 백트래킹 문제를 해결해보자.
```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

- 처음에 `path`  라는 빈배열과 `nums` 라는 기존 숫자 배열 두 가지를 사용한다. 
- 빈 배열로 시작해 다음 단계 노드로 넘어갈 때마다 가능한 조합의 수를 하나씩 추가하면서 깊이 우선 탐색을 진행한다. 
- 이때, `path` 배열에 추가한 숫자는 기존 `nums`  배열에서 제거를 해, 해당 경로를 지나갔다고 체크한다. 
- 만약 `nums`  배열에 값이 하나도 없다면, 해당  경로는 더이상 추가할 숫자가 없다는 뜻이므로, 이전 분기점으로 돌아간다. (백트래킹)

![backtracking 001](https://user-images.githubusercontent.com/72732446/147382506-a9e43085-f8b3-4ba4-8b1b-a73e8ca307fa.jpeg)


문제 해결과정을 아래와 같이 트리로 나타낼 수 있다. 첫번째 조합인 `[1, 2, 3]` 을 얻는 방법을 설명하면 아래와 같다.
- **첫번째 단계**: `path`: [] `nums`: [1, 2, 3]
- **두번째 단계**: `nums`의 첫번째 원소 1를 `path`에 넣고 다음 단계로 넘어감 `path`: [1] `nums`: [2, 3]
- **세번째 단계**: `nums`의 첫번째 원소 2를 `path`에 넣고 다음 단계로 넘어감 `path`: [1, 2] `nums`: [3]
- **네번째 단계**: `nums`의 첫번째 원소 3를 `path`에 넣고 다음 단계로 넘어감 `path`: [1, 2, 3] `nums`: []
- **마지막 백트래킹**: `nums`에 값이 없으므로, `path` 에서 구한 조합을 `result` 해답 배열에 추가함. (백트래킹) 더 이상 다음 단계가 없으므로, 다음 경로로 넘어간다.

단계별로 시각화를 하자면 아래 그림과 같다:

![backtracking 001](https://user-images.githubusercontent.com/72732446/147382581-06c3312f-5a20-4378-a546-4c462d489455.jpeg)

 코드로 시각화가 잘 된 예시가 있어서 참고하면 좋을 듯 하다⬇

```python
dfs(nums = [1, 2, 3] , path = [] , result = [] )
|____ dfs(nums = [2, 3] , path = [1] , result = [] )
|      |___dfs(nums = [3] , path = [1, 2] , result = [] )
|      |    |___dfs(nums = [] , path = [1, 2, 3] , result = [[1, 2, 3]] ) # added a new permutation to the result
|      |___dfs(nums = [2] , path = [1, 3] , result = [[1, 2, 3]] )
|           |___dfs(nums = [] , path = [1, 3, 2] , result = [[1, 2, 3], [1, 3, 2]] ) # added a new permutation to the result
|____ dfs(nums = [1, 3] , path = [2] , result = [[1, 2, 3], [1, 3, 2]] )
|      |___dfs(nums = [3] , path = [2, 1] , result = [[1, 2, 3], [1, 3, 2]] )
|      |    |___dfs(nums = [] , path = [2, 1, 3] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3]] ) # added a new permutation to the result
|      |___dfs(nums = [1] , path = [2, 3] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3]] )
|           |___dfs(nums = [] , path = [2, 3, 1] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1]] ) # added a new permutation to the result
|____ dfs(nums = [1, 2] , path = [3] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1]] )
       |___dfs(nums = [2] , path = [3, 1] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1]] )
       |    |___dfs(nums = [] , path = [3, 1, 2] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2]] ) # added a new permutation to the result
       |___dfs(nums = [1] , path = [3, 2] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2]] )
            |___dfs(nums = [] , path = [3, 2, 1] , result = [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] ) # added a new permutation to the result
```

출처: [리트코드 Baka_Debakar 님의 풀이](https://leetcode.com/problems/permutations/discuss/18296/Simple-Python-solution-(DFS)./307079)


## 참고
> -  [46. Permutations](https://leetcode.com/problems/permutations/)
> - [Leetcode: Simple Python solution (DFS)](https://leetcode.com/problems/permutations/discuss/18296/Simple-Python-solution-(DFS).)
> - [Leetcode: DFS/backtracking - Python/Java/Javascript, PICTURE](https://leetcode.com/problems/permutations/discuss/685868/DFSbacktracking-PythonJavaJavascript-PICTURE)