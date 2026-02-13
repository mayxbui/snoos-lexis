// src/server/core/wordTrie.ts

/**
 * Trie (Prefix Tree) Data Structure
 * 
 * Advantages:
 * - O(m) word lookup where m = word length (vs O(log n) binary search)
 * - Prefix-based operations: autocomplete, spell check
 * - Space efficient for large dictionaries
 * 
 * Complexity:
 * - Insert: O(m)
 * - Search: O(m)
 * - Delete: O(m)
 * - Space: O(ALPHABET_SIZE * total_characters)
 */

export class TrieNode {
  children: Map<string, TrieNode> = new Map();
  isEndOfWord: boolean = false;
  frequency: number = 0; // How often this word appears
}

export class WordTrie {
  private root: TrieNode = new TrieNode();
  private wordCount: number = 0;

  /**
   * Insert a word into the Trie
   * Time: O(m) where m = word length
   */
  insert(word: string): void {
    let node = this.root;
    const lowerWord = word.toLowerCase();

    for (const char of lowerWord) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char)!;
    }

    if (!node.isEndOfWord) {
      this.wordCount++;
    }
    node.isEndOfWord = true;
    node.frequency++;
  }

  /**
   * Search for an exact word
   * Time: O(m) where m = word length
   */
  search(word: string): boolean {
    const node = this._findNode(word.toLowerCase());
    return node !== null && node.isEndOfWord;
  }

  /**
   * Check if word starts with prefix
   * Time: O(m) where m = prefix length
   */
  startsWith(prefix: string): boolean {
    return this._findNode(prefix.toLowerCase()) !== null;
  }

  /**
   * Get all words with given prefix
   * Time: O(N) where N = nodes in subtree
   */
  getWordsWithPrefix(prefix: string): string[] {
    const node = this._findNode(prefix.toLowerCase());
    if (!node) return [];

    const words: string[] = [];
    this._dfsCollect(node, prefix.toLowerCase(), words);
    return words;
  }

  /**
   * Find the longest word that can be formed from given letters
   * Useful for finding the "best" word with available letters
   */
  findLongestWord(letters: string[]): string | null {
    const frequency = new Map<string, number>();
    for (const letter of letters) {
      frequency.set(letter.toLowerCase(), (frequency.get(letter.toLowerCase()) || 0) + 1);
    }

    let longestWord: string | null = null;
    this._dfsFindLongest(this.root, '', frequency, (word) => {
      if (!longestWord || word.length > longestWord.length) {
        longestWord = word;
      }
    });

    return longestWord;
  }

  /**
   * Delete a word from the Trie
   * Time: O(m) where m = word length
   */
  delete(word: string): boolean {
    const lowerWord = word.toLowerCase();
    const result = this._deleteHelper(this.root, lowerWord, 0);
    if (result) {
      this.wordCount--;
    }
    return result;
  }

  /**
   * Get total number of words in Trie
   */
  getWordCount(): number {
    return this.wordCount;
  }

  /**
   * Get all words in the Trie
   * Time: O(N) where N = total nodes
   */
  getAllWords(): string[] {
    const words: string[] = [];
    this._dfsCollect(this.root, '', words);
    return words;
  }

  /**
   * Find node for a given word/prefix
   * Private helper
   */
  private _findNode(word: string): TrieNode | null {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        return null;
      }
      node = node.children.get(char)!;
    }
    return node;
  }

  /**
   * Collect all words using DFS
   * Private helper
   */
  private _dfsCollect(
    node: TrieNode,
    prefix: string,
    words: string[]
  ): void {
    if (node.isEndOfWord) {
      words.push(prefix);
    }

    for (const [char, child] of node.children) {
      this._dfsCollect(child, prefix + char, words);
    }
  }

  /**
   * DFS to find longest word from available letters
   * Private helper
   */
  private _dfsFindLongest(
    node: TrieNode,
    currentWord: string,
    availableLetters: Map<string, number>,
    callback: (word: string) => void
  ): void {
    if (node.isEndOfWord && currentWord.length >= 3 && currentWord.length <= 6) {
      callback(currentWord);
    }

    // Stop if word too long
    if (currentWord.length >= 6) {
      return;
    }

    for (const [letter, count] of availableLetters) {
      if (count > 0 && node.children.has(letter)) {
        availableLetters.set(letter, count - 1);
        this._dfsFindLongest(
          node.children.get(letter)!,
          currentWord + letter,
          availableLetters,
          callback
        );
        availableLetters.set(letter, count);
      }
    }
  }

  /**
   * Delete helper using recursion
   * Private helper
   */
  private _deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word not found
      }
      node.isEndOfWord = false;
      return node.children.size === 0; // Return true if node should be deleted
    }

    const char = word[index];
    if(char===undefined) return false;
    const child = node.children.get(char);

    if (!child) {
      return false; // Character not found
    }

    const shouldDeleteChild = this._deleteHelper(child, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }

    return false;
  }
}

// Singleton instance
let instance: WordTrie | null = null;

export function getWordTrie(): WordTrie {
  if (!instance) {
    instance = new WordTrie();
  }
  return instance;
}

/**
 * Usage example:
 * 
 * const trie = getWordTrie();
 * trie.insert('cat');
 * trie.insert('car');
 * trie.insert('card');
 * 
 * console.log(trie.search('cat'));           // true
 * console.log(trie.search('ca'));            // false
 * console.log(trie.startsWith('ca'));        // true
 * console.log(trie.getWordsWithPrefix('ca')); // ['cat', 'car', 'card']
 */