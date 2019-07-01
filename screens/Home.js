import React from 'react'
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native'
import { Card, CardItem, Body, Fab, Icon, Form, Item, Input, Spinner} from 'native-base';
import Modal from "react-native-modal";
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import axios from 'axios';

export default class Home extends React.Component{
    static navigationOptions = {
        title: "Todolist App",
        headerStyle:{
            backgroundColor: '#03A9F4'
        },
        headerTintColor: '#fff'
    }
    state = {
        isModalVisible: false,
        todo:{
            waktu_mulai: null,
            waktu_selesai: null,
            nama: null,
            kegiatan: null
        },
        tanggal: null,
        data:[],
        loading: true
      };
     
    _toggleModal = () =>{
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }
    _toggleError = () =>{
        this.setState({ modalError: !this.state.modalError });
    }

    setDate(date){
        const todo = Object.assign({}, this.state.todo)
        todo.waktu_selesai = moment(date, 'dddd, DD MMMM YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss')
        const tanggal = date;
        this.setState({todo, tanggal})
    }
    setName(name){
        const todo = Object.assign({}, this.state.todo)
        todo.nama = name;
        this.setState({todo})
    }
    setKegiatan(kegiatan){
        const todo = Object.assign({}, this.state.todo)
        todo.kegiatan = kegiatan;
        todo.waktu_mulai = new moment().format('YYYY-MM-DD HH:mm:ss')
        this.setState({todo})
    }
    saveData=()=>{
        this._toggleModal()
        axios.post('https://domain.com/api/addTodo',this.state.todo)
        .then(()=>{
            this.getData();
            Alert.alert(
                'Berhasil!',
                'Data berhasil di tambahkan.',
                {text: 'OK'},
                {cancelable: false},
              );
              const todo = Object.assign({}, this.state.todo)
                todo.waktu_mulai= null,
                todo.waktu_selesai= null,
                todo.nama= null,
                todo.kegiatan= null,
                this.setState({todo, tanggal: null});
        })
        .catch(()=>{
            Alert.alert(
                'Gagal!',
                'Maaf, data gagal ditambahkan.',
                {text: 'OK'},
                {cancelable: false},
              );
              const todo = Object.assign({}, this.state.todo)
                todo.waktu_mulai= null,
                todo.waktu_selesai= null,
                todo.nama= null,
                todo.kegiatan= null,
                this.setState({todo, tanggal: null});
        })
    }
    getData=()=>{
        axios.get('https://domain.com/api/getTodo')
        .then(res =>{
            const raw = res.data.data;
            const data = [...new Set(raw.map(x => x.nama))];
            this.setState({data, loading: false})
        })
    }

    componentDidMount(){
        this.getData()
    }
    


    render(){
        if(this.state.loading){
            return(
                <View style={styles.loading}>
                    <Spinner color="#03A9F4" />
                </View>
            )
        }
        return(
            <View style={styles.container}>
                <CardItem style={styles.title}>
                    <Text style={styles.font}>Daftar Peserta</Text>
                </CardItem>
                <ScrollView>
                    {
                    this.state.data.map((data, index)=>
                    <Card key={index}>
                        <CardItem button onPress={()=>this.props.navigation.navigate('List', {nama: data})}>
                            <Text style={styles.name}>
                                {data}
                            </Text>
                        </CardItem>
                    </Card>
                    )}
                </ScrollView>
                <Modal isVisible={this.state.isModalVisible}>
                    <Card>
                        <CardItem header>
                            <Text style={styles.titleModal}>Input Peserta</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Form style={styles.form}>
                                    <Item style={styles.item}>
                                        <Input
                                            placeholder="Nama Peserta"
                                            placeholderTextColor="grey"
                                            onChangeText={this.setName.bind(this)} />
                                    </Item>
                                    <Item style={styles.item}>
                                        <Input
                                            placeholder="Nama Kegiatan"
                                            placeholderTextColor="grey"
                                            onChangeText={this.setKegiatan.bind(this)} />
                                    </Item>
                                    <Item style={styles.item}>
                                        <DatePicker
                                        style={{width: '90%'}}
                                        locale='id'
                                        date={this.state.tanggal}
                                        mode="datetime"
                                        placeholder="Waktu Selesai"
                                        format="dddd DD MMMM YYYY HH:mm"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        showIcon={false}
                                        customStyles={{
                                        dateInput: {
                                            borderWidth: 0,
                                            alignItems: 'flex-start',
                                            paddingLeft: 5
                                            },
                                        placeholderText:{
                                            fontSize: 16,
                                            color: 'grey'
                                            }
                                        }}
                                        onDateChange={this.setDate.bind(this)}
                                    />
                                    </Item>
                                </Form>
                            </Body>
                        </CardItem>
                        <CardItem footer style={styles.footer}>
                            <View style={styles.right}>
                                <Button color="grey" title="Close" onPress={this._toggleModal} />
                                <Button title="Save" style={styles.save} onPress={this.saveData} />
                            </View>
                        </CardItem>
                    </Card>
                </Modal>
                <Fab
                    onPress={this._toggleModal}
                    position="bottomRight"
                    style={{backgroundColor:'tomato'}}>
                    <Icon type="MaterialIcons" name="add"/>                    
                </Fab>
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
        fontSize: 20
    },
    name:{
        fontSize: 18,
        paddingVertical: 5
    },
    modal:{
        
    },
    titleModal:{
        fontSize: 16,
        fontWeight: 'bold',
    },
    form:{
        width: '100%',
    },
    item:{
        marginLeft: 0
    },
    footer:{
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    right:{
        flexDirection: 'row'
    },
    save:{
        marginLeft: 10
    },
    error:{
        fontSize: 16,
        fontWeight: 'bold'
    },
    err:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    loading:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
})