from input_codeundefined import solution

def get_test_cases():
    return {
        'SMALL_INPUT': [1, 2, 3],
        'LARGE_INPUT': [1, 2, 3] * 1000 + [4],
    }

def get_expected_outputs():
    return {
        'SMALL_INPUT': 3,
        'LARGE_INPUT': 4,
    }

def test_code():
    test_cases