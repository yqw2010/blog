window.ConfigParam = {
    total: 12,
    stars: 5
}

/**
 * [ConfigDOM 渲染DOM所需数据]
 *
 * 数据类型分为两种，一种是无分组(group)属性，如一星; 一种是包含分组，如二星。
 * @type {Object}
 */
window.ConfigDOM = {
    "二星": [{
        group: "直选",
        data: [{
            m: "标准选号",
            intro: "从00~99中任选1个或多个2位数，与开奖号码后两位相同则中奖116.00元。",
            type: "两星直选",
            pos: [2, 1]
        }]
    }],

    "七星": [{
        m: "标准选号",
        intro: "从个位选择1个或多个号码，选号与开奖号码个位一致即中奖11元。",
        type: "一星",
        pos: [1, 1]
    }]
};