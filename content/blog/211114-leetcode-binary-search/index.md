---
title: 이진 탐색(Binary Search) 구현하기
date: "2021-11-14T22:40:32.169Z"
description: 이진 탐색(binary search)은 정렬된 배열 내에서 목표 값을 찾는 검색 알고리즘이다.
category: "Algorithm"
---

<img src="https://velog.velcdn.com/images/khy226/post/f8a7ddf0-2f9b-47eb-8115-ba6a7442e560/leetcode_logo.001.jpeg" style="width: 60%; padding-bottom: 50px;">


## 이진 탐색

컴퓨터 과학에서 **이진 탐색(binary search)** 은 **정렬된 배열** 내에서 목표 값의 위치를 찾는 검색 알고리즘이다. 이진 탐색은 대상(target) 값을 배열의 중간 값 비교한다.(여기서 찾고자 하는 대상 값을 타겟 이라고 하겠다.) 두 값(중간 값 vs. 타겟)이 같지 않으면 타겟이 없는 배열의 절반이 제거되고 나머지 절반에서 검색이 계속된다. 다시 중간 값를 사용하여 타겟과 비교하며 배열 내에서 타겟 값이 발견될 때까지 이 작업을 반복한다. 배열의 절반이 비어 있는 상태에서 검색이 종료된다면, 타겟이 배열에 없는 것이다.

이진 탐색은 최악의 경우 `O(logn)`시간 만큼의 비교를 수행한다. 여기서 `n`은 배열에 있는 요소들의 총 합이다. 이진 탐색은 작은 배열을 제외하고 선형 검색보다 빠르다. 그러나 이진 탐색을 적용하려면 배열을 먼저 오름차순으로 정렬해야 한다. 물론, 해시 테이블과 같은 이진 탐색보다 더 효율적으로 검색할 수 있는 특수 데이터 구조들이 있다. 그러나 이진 탐색은 배열에 없는 경우에도 배열에서 가장 작은 요소 또는 가장 큰 요소를 찾는 것과 같은 더 넓은 범위의 문제를 해결하는 데 사용될 수 있다.

<hr>

## 이진 탐색 예시

![binary search img](https://camo.githubusercontent.com/c2075ff2cd7addf00519d2c6b719caa84f43264782669ba790ce06a496cd3993/68747470733a2f2f7777772e6765656b73666f726765656b732e6f72672f77702d636f6e74656e742f75706c6f6164732f42696e6172792d5365617263682e706e67)

사진 출처: [Geeks for Geeks: Binary Search](https://www.geeksforgeeks.org/binary-search/) 

위 사진을 예시로 이진 탐색을 수행해보자. 찾고자하는 타겟값은 23이며, 편의상 x라고 지칭한다.

1. x를 중간 원소인 16과 비교한다.
2. 16이 x보다 작으므로, x는 해당 원소보다 배열의 우측에 존재한다.
3. 따라서, 왼쪽 절반 (2, 5, 8, 12) 값들을 버리고 오른쪽 배열 (23, 38, 56, 72, 91) 에서 다시 똑같은 이진 탐색을 실행한다.
4. 오른쪽 배열에서 중간값은 56이다.
5. 56은 x보다 크다. 따라서 x는 해당 원소보다 배열의 좌측에 존재한다.
6. 배열의 오른쪽 절반(56, 72, 91) 값들을 버리고, 왼쪽에 있는 배열에서 다시 검색을 한다.
7. x값인 23을 찾는다. x의 위치값인 5를 리턴한다.

<hr>

## 이진 탐색 의사코드

위 사진에서 들은 예시를 정리하자면 아래와 같다.

1. x를 중간 요소와 비교한다.
2. x가 중간 요소와 일치하면 중간 요소의 위치값을 리턴한다.
3. x가 중간 요소보다 크다면, x는 중간 요소 뒤에 있는 오른쪽(큰) 절반 배열 안에만 있을 수 있다. 그리고 오른쪽 절반에서 다시 알고리즘을 적용한다.
4. x가 중간 요소보다 작으면, x는 중간 요소 앖에 있는 왼쪽(아래) 절반에 위치해야 한다. 그래서 왼쪽 절반에 다시 알고리즘을 적용한다.



이진 탐색은 재귀와 반복문으로 나타낼 수 있으며, 의사 코드(pseudo code)로 위 정의를 나타내면 아래와 같다:

```javascript
// 재귀

BinarySearch(A[0..N-1], value, low, high) {
  if (high < low)
    return -1 // x가 배열에 없을 때 
  mid = (low + high) / 2 // 중간 요소 설정
  if (A[mid] > value)
    return BinarySearch(A, value, low, mid-1) // 오른쪽 배열 버리고 다시 이진 탐색 (recursive)
  else if (A[mid] < value)
    return BinarySearch(A, value, mid+1, high) // 왼쪽 배열 버리고 다시 이진 탐색 (recursive)
  else
    return mid // 위치값 리턴
}
```



```javascript
// 반복

binarySearch(A[0..N-1], value) {
  low = 0
  high = N - 1 // 시작(low)과 끝(high)값 설정
  while (low <= high) {
      mid = (low + high) / 2 // 중간 요소 설정
      if (A[mid] > value)
          high = mid - 1  // 오른쪽 배열 버리고 다시 이진 탐색 (while문)
      else if (A[mid] < value)
          low = mid + 1 // 왼쪽 배열 버리고 다시 이진 탐색 (while문)
      else
          return mid // found k
  }
  return -1 // not found k
}
```



<br>

## Python 으로 이진 탐색 구현하기

### 재귀(Recursive):

```python
def binary_search(arr, low, high, x):

    # Check base case
    if high >= low:

        mid = (high + low) // 2

        # 만약 x가 중간에 위치한다면
        if arr[mid] == x:
            return mid

        # 만약 x가 중간 값 보다 작다면, x는 왼쪽 subarray에 존재함
        elif arr[mid] > x:
            return binary_search(arr, low, mid - 1, x)

        # 반대로, x가 중간 값 보다 크다면, x는 오른쪽 subarray에 존재함
        else:
            return binary_search(arr, mid + 1, high, x)

    else:
        # x가 배열에 존재하지 않았음
        return -1
```



### 반복(Iterative):

```python
def binary_search(arr, x):
    low = 0
    high = len(arr) - 1
    mid = 0

    while low <= high:

        mid = (high + low) // 2

        # x가 mid값 보다 더 크다면, 배열의 왼쪽 절반을 무시한다.
        if arr[mid] < x:
            low = mid + 1

        # x가 mid값 보다 더 작다면, 배열의 오른쪽 절반을 무시한다.
        elif arr[mid] > x:
            high = mid - 1

        # x가 mid값과 같을 때
        else:
            return mid

    # while문을 다 돌아도 x값이 안나온다면, 배열에 x가 없다는 뜻
    return -1
```

<br>

## Leet Code 이진 탐색 예시

이진 탐색 개념을 알았으니, 이제 이진 탐색 문제를 풀어보자. 리트코드 `easy` 난이도 문제이다.

### 704. Binary Search

Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1. You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```python
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
```

Explanation: 9 exists in nums and its index is 4



**Example 2:**

```python
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
```

Explanation: 2 does not exist in nums so return -1

**Constraints:**

```python
1 <= nums.length <= 104
-104 < nums[i], target < 104
```

- All the integers in nums are unique.

- nums is sorted in ascending order.



### 나의 풀이:

```python
class Solution:
    def search(self, nums: List[int], target: int) -> int:
        start = 0
        end = len(nums) - 1
        
        while start <= end:
            mid = (start + end) // 2
            # if 'mid' number is same as target, return
            if nums[mid] == target:
                return mid
            # If target is smaller, ignore right half array
            elif nums[mid] > target:
                end = mid -1
            # If target is greater, ignore left half array
            elif nums[mid] < target:
                start = mid + 1
        # If we reach here, then the element was not present
        return -1
```



<hr>

## 참고

> - [Binary search algorithm - Wikipedia](https://en.wikipedia.org/wiki/Binary_search_algorithm)
> - [Python Program for Binary Search (Recursive and Iterative) - Geeks for Geeks](https://www.geeksforgeeks.org/python-program-for-binary-search/)
> - [Leet Code - 704. Binary Search](https://leetcode.com/problems/binary-search/)