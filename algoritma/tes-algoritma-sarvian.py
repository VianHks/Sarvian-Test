
### Soal No. 1 ###
def reverse_alphabet(string):
    kata = ''.join(filter(str.isalpha, string))
    number = ''.join(filter(str.isdigit, string))

    reversed_alphabet = kata[::-1]

    result = reversed_alphabet + number

    return result

string = "wakuncar123"
result = reverse_alphabet(string)
print("1. Hasil Reverse Kata =", result)

### Soal No. 2 ###
def longest(sentence):
    words = sentence.split()

    longest_word = ""

    for word in words:

        if len(word) > len(longest_word):
            longest_word = word

    return longest_word

sentence = "Mencoba masakan mamah setiap harinya terasa sangat menyenangkan"
longest_word = longest(sentence)
print("2. Jadi Kata Terpanjang adalah", longest_word + ": " + str(len(longest_word)) + " characters")

### Soal No. 3 ###
def count_frequent_words(INPUT, QUERY):
    word_counts = {}
    for word in INPUT:
        word_counts[word] = word_counts.get(word, 0) + 1
    
    query_counts = []
    for word in QUERY:
        count = word_counts.get(word, 0)
        query_counts.append((word, count))
    
    return query_counts

INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']

output = count_frequent_words(INPUT, QUERY)
print("3. Frekuensi kata dalam array:")
for word, count in output:
    print(f"{word} = {count}")

### Soal No. 4 ###
def calculate_diagonal(matrix):
    diagonal_sum_1 = 0
    diagonal_sum_2 = 0

    for i in range(len(matrix)):
        diagonal_sum_1 += matrix[i][i]


    for i in range(len(matrix)):
        diagonal_sum_2 += matrix[i][len(matrix) - 1 - i]


    return abs(diagonal_sum_1 - diagonal_sum_2)

matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
]
result = calculate_diagonal(matrix)
print("4. Hasil selisih diagonal matriks:", result)
