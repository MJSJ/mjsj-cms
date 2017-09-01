// ────────────────────────────────────────────────────────────────────────────────
// mock数据的
// ────────────────────────────────────────────────────────────────────────────────

export const subjectList = [
    {
        id: "001",
        name: "专题name",
        lastEdit: {
            userName: "旷宇",
            time: "11:11 2017/08/08"
        },
        owner: {
            name: "公司A",
            id: "001"
        }
    },
    {
        id: "002",
        name: "专题name",
        lastEdit: {
            userName: "旷宇",
            time: "11:11 2017/08/08"
        },
        owner: {
            name: "公司A",
            id: "001"
        }
    },
    {
        id: "003",
        name: "专题name",
        lastEdit: {
            userName: "旷宇",
            time: "11:11 2017/08/08"
        },
        owner: {
            name: "公司A",
            id: "001"
        }
    }
]


export const result = {}

export const subject = {
    name: "subjectname",
    id: 111,
    tag: "版本标识",
    owner: {
        name: "拥有者",
    },
    history: [
        {
            tag: "v1",
            content: "<div>v1的代码</div>",
            time:"11:11 2017/08/08",
            userName:"公司A"
        },
        {
            tag: "v2",
            content: "<div>v2的代码</div>",
            time:"11:11 2017/08/09",
            userName:"公司B"
        },
    ]
}

export const totalTopics = [
    {
        id: 111,
        name: "专题name",
        isChecked: false
    },
    {
        id: 111,
        name: "傻逼专题",
        isChecked: false
    },
    {
        id: 111,
        name: "牛逼专题",
        isChecked: false
    },
    {
        id: 111,
        name: "low逼专题",
        isChecked: false
    },
    {
        id: 111,
        name: "懵逼专题",
        isChecked: false
    },
    {
        id: 111,
        name: "蠢比专题",
        isChecked: false
    },
    {
        id: 111,
        name: "菜逼专题",
        isChecked: false
    },
    {
        id: 111,
        name: "二逼专题",
        isChecked: false
    }
];

export const userList = [
    {
        id: 111,
        role: 1,
        name: "公司A",
        password: "",
        subjectList: [
            {
                id: 111,
                name: "专题name"
            }
        ]
    },
    {
        id: 'leibown',
        role: 1,
        name: "公司B",
        password: "",
        subjectList: [
            {
                id: 111,
                name: "傻逼专题"
            },
            {
                id: 111,
                name: "牛逼专题"
            },
            {
                id: 111,
                name: "low逼专题"
            }
        ]
    }
]