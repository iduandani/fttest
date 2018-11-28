<template>
    <div>
        <Table  :columns="columns1" :data="data1" ></Table>
        <Page :total="100" show-elevator show-sizer show-total />
    </div>
</template>
<script>
export default {
    name:"HqhlTable",
    data(){
        return {
            columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Address',
                        key: 'address'
                    },{
                        title:'数量',
                        render:(h) => {
                            return h('div', [
                                h('Input', {
                                    props: {
                                        type: 'password',
                                        size: 'default'
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
        }
    }
}
</script>

