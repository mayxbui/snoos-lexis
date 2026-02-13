import { WordTrie } from "./wordTrie";
import {WORD_LIST} from "./wordList";

let trie: WordTrie | null = null;

export function getWordTrie(): WordTrie {
  if (!trie) {
    trie = new WordTrie();

    for (const word of WORD_LIST) {
      trie.insert(word.toLowerCase());
    }

    console.log(`Loaded ${trie.getWordCount()} words into Trie`);
  }

  return trie;
}

export function isValidWord(word: string): boolean {
  return getWordTrie().search(word.toLowerCase());
}
