package com.example;

import java.util.*;

public class CollectionsPractice {
    public static List<Integer> removeDuplicates(List<Integer> list) {
        Set<Integer> seen = new HashSet<>();
        List<Integer> results = new ArrayList<>();
        for (Integer item : list) {
            if (!seen.contains(item)) {
                seen.add(item);
                results.add(item);
            }
        }
        return results;
    }

    public static List<Integer> removeDuplicatesV2(List<Integer> list) {
        return new ArrayList<>(new LinkedHashSet<>(list));
    }

    public static Map<Character, Integer> characterFreq(String str) {
        Map<Character, Integer> map = new HashMap<>();
        char[] arr = str.toCharArray();
        for (char ch : arr) {
            map.put(ch, map.getOrDefault(ch, 0) + 1);
        }
        return map;
    }

    public static void main(String args[]) {
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 4, 5, 1, 4, 6, 7, 8);
        System.out.println(removeDuplicates(list));
        System.out.println(removeDuplicatesV2(list));
        System.out.println(characterFreq("Manmohini yadav"));
    }
}
