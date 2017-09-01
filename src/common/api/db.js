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


<<<<<<< HEAD
export const result = {}
=======


export const result = {
    code:"200",
    data:{success:true}
}
>>>>>>> c0334cffb5403fe126ce1ae40a5c88c3a99cdfa7





export const subject = {
<<<<<<< HEAD
    name: "subjectname",
    id: 111,
    tag: "版本标识",
    owner: {
        name: "拥有者",
    },
    history: [
        {
            tag: "v1",
            content: "<div>v1的代码</div>"
        },
        {
            tag: "v1",
            content: "<div>v1的代码</div>"
=======
    name:"subjectname1",
    id:111,
    owner:{
        name:"拥有者(火火)",
    },

    history:[
        {   id:1,
            tag:"版本标识2.0",
            content:"<div>v1的代码</div>",
            userName:"huohuo1",
            time:"11:11 2017/08/08"
        },
        {   id:2,
            tag:"版本标识3.0",
            content:"<div>v2的代码</div>",
            userName:"huohuo2",
            time:"11:11 2017/08/08"
>>>>>>> c0334cffb5403fe126ce1ae40a5c88c3a99cdfa7
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