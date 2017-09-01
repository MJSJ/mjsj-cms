// ────────────────────────────────────────────────────────────────────────────────
// mock数据的
// ────────────────────────────────────────────────────────────────────────────────

export const subjectList =  [
    {
        id:"001",
        name:"专题name",
        lastEdit:{
            userName:"旷宇",
            time:"11:11 2017/08/08"
        },
        owner:{
            name:"公司A",
            id:"001"
        }
    },
    {
        id:"002",
        name:"专题name",
        lastEdit:{
            userName:"旷宇",
            time:"11:11 2017/08/08"
        },
        owner:{
            name:"公司A",
            id:"001"
        }
    },
    {
        id:"003",
        name:"专题name",
        lastEdit:{
            userName:"旷宇",
            time:"11:11 2017/08/08"
        },
        owner:{
            name:"公司A",
            id:"001"
        }
    }
]




export const result = {
    code:"200",
    data:{success:true}
}





export const subject = {
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
        },
    ]
}