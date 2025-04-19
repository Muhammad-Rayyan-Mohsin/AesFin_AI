def get_hash(s):
    """
    Generate a hash string for a given string based on character frequency.
    """
    max_char = 26
    freq = [0] * max_char
    
    for ch in s:
        freq[ord(ch) - ord('a')] += 1
    
    return ','.join(map(str, freq))

def group_anagrams(arr):
    """
    Group anagrams together and return their indices.
    """
    res = []
    mp = {}
    
    for i, s in enumerate(arr):
        key = get_hash(s)
        if key not in mp:
            mp[key] = len(res)
            res.append([])
        res[mp[key]].append(i)
    
    return res

# Example usage:
if __name__ == "__main__":
    # Test the functions
    test_strings = ["eat", "tea", "tan", "ate", "nat", "bat"]
    result = group_anagrams(test_strings)
    print("Grouped anagram indices:", result) 