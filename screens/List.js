import React from 'react'
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Card, CardItem, Spinner } from 'native-base';
import axios from 'axios';
import moment from 'moment'

export default class List extends React.Component{
    static navigationOptions = ({navigation})=> {
        const nama = navigation.getParam('nama')
        return{
        title: "Daftar Kegiatan "+nama,
        headerStyle:{
            backgroundColor: '#03A9F4'
        },
        headerTintColor: '#fff'
        }
    }
    constructor(props){
        super(props),
        this.state={
            data: null,
            tgl: null,
            loading: true
        }
    }
    componentDidMount(){
        const tanggal = new moment().format('YYYY-MM-DD')
        const tgl = new moment().format('DD MMMM YYYY')
        const nama = this.props.navigation.getParam('nama')
        axios.get('https://domain.com/api/getDetailTodo?nama='+nama+'&tanggal='+tanggal)
        .then(res=>{
            const data = res.data.data;
            this.setState({data, tgl, loading: false})
        })
    }

    render(){
        if(this.state.loading){
            return(
                <View style={styles.loading}>
                    <Spinner color="#03A9F4" />
                </View>
            )
        }
        if(this.state.data == ''){
            return(
                <View style={styles.loading}>
                    <Text style={styles.kosong}>Tidak ada kegiatan hari ini</Text>
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <CardItem style={styles.title}>
                    <Text style={styles.font}>{this.state.tgl}</Text>
                </CardItem>
                <ScrollView>
                    {
                    this.state.data.map((data, id)=>
                    <Card key={id}>
                        <CardItem style={styles.card}>
                            <View style={styles.right}>
                                <Text>{moment(data.waktu_mulai).format('HH:mm')} - {moment(data.waktu_selesai).format('HH:mm')}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>
                                    {data.kegiatan}
                                </Text>
                            </View>
                        </CardItem>
                    </Card>
                    )}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 10
    },
    title:{
        paddingLeft: 5
    },
    font:{
        fontSize: 16
    },
    name:{
        fontSize: 18,
        paddingVertical: 5
    },
    card:{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    right:{
        flex: 1,
        alignItems: 'flex-end',
        fontSize: 14    
    },
    name:{
        fontSize: 16
    },
    loading:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    kosong:{
        fontSize: 20,
        color: 'grey'
    }
})