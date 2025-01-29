let groupCounter = 1;  // 全局变量来跟踪组数

function validateNumbers() {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const num3 = parseInt(document.getElementById('num3').value);
    const num4 = parseInt(document.getElementById('num4').value);
    
    // 清空输入框
    document.getElementById('num1').value = '';
    document.getElementById('num2').value = '';
    document.getElementById('num3').value = '';
    document.getElementById('num4').value = '';

    if ([num1, num2, num3, num4].some(num => isNaN(num) || num < 1 || num > 10)) {
        alert('所有输入必须是1到10之间的数字。');
        return;
    }

    const numbers = [num1, num2, num3, num4];
    const resultsList = document.getElementById('resultsList');
    let resultItem = document.createElement('li');

    let prefix = `第${groupCounter++}组：`;

    if (canMake24(numbers)) {
        resultItem.innerHTML = `${prefix}${numbers.join(', ')} 可以凑24点`;
        resultItem.className = 'success';
    } else {
        resultItem.innerHTML = `${prefix}${numbers.join(', ')} 不能凑24点`;
        resultItem.className = 'failure';
    }
    resultsList.appendChild(resultItem);
}

function canMake24(nums) {
    if (nums.length === 1) {
        return Math.abs(nums[0] - 24) < 0.0001;
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                let rest = nums.filter((_, index) => index !== i && index !== j);
                let results = [];
                
                // 尝试所有四种运算符
                results.push(nums[i] + nums[j]);
                results.push(nums[i] - nums[j]);
                results.push(nums[i] * nums[j]);
                if (nums[j] !== 0) results.push(nums[i] / nums[j]);

                for (const result of results) {
                    if (canMake24([result, ...rest])) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}