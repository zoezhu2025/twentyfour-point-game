function checkSolution() {
    let numbers = [];
    for (let i = 0; i < 4; i++) {
        let number = prompt(`请输入第${i + 1}个数字 (1-10之间的自然数):`);
        number = parseInt(number, 10); // 将输入转换为整数
        // 检查数字是否在1到10之间
        while (isNaN(number) || number < 1 || number > 10) {
            alert("错误：请输入1到10之间的自然数!");
            number = parseInt(prompt(`请输入第${i + 1}个数字 (1-10之间的自然数):`), 10);
        }
        numbers.push(number);
    }

    // 调用功能函数并通过对话框显示结果
    if (canMake24(numbers)) {
        alert(`这四个数${numbers.join(', ')}可以凑24点`);
    } else {
        alert(`这四个数${numbers.join(', ')}不能凑24点`);
    }

    // 弹出对话框询问用户是否需要再次验证
    if (confirm("验证完成，是否需要再次验证？")) {
        checkSolution(); // 递归调用自身来重启验证过程
    }
}

// 功能函数，用于尝试所有运算组合
function canMake24(nums) {
    if (nums.length === 1) {
        return Math.abs(nums[0] - 24) < 0.0001;
    }

    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (i !== j) {
                const nextNums = nums.filter((_, index) => index !== i && index !== j);
                const results = [
                    nums[i] + nums[j],
                    nums[i] - nums[j],
                    nums[j] - nums[i],
                    nums[i] * nums[j]
                ];
                if (nums[j] !== 0) results.push(nums[i] / nums[j]);
                if (nums[i] !== 0) results.push(nums[j] / nums[i]);

                for (const result of results) {
                    if (canMake24([...nextNums, result])) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}