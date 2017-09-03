import React from 'react';
import { Link } from 'react-router';
import { Table, Loader, Button, Message, Dimmer, Icon, Header, Grid, Image, Item, List, Checkbox, Form, Input, Select, Card, Segment } from 'semantic-ui-react';
import '../atendimento.scss';
import SelectPaciente from 'ui/shared/Selects/SelectPaciente';
import BreadcrumbCustom from 'ui/shared/BreadcrumbCustom';
import AvaliacaoApi from 'service/api/avaliacao.api';
import Slider from 'react-slick';
import Imagens from '../Assets/images';

class Cadastro extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            loading: true,
            openModal: false,
            imagemPreview: {},
            avaliacao: {
                data: '',
                servicos: [],
                avaliacao_status_id: '1',
                paciente_id: '',
            }
        }
    }

    handleChange = (e, { name, value }) => {
        let avaliacao = this.state.avaliacao;
        avaliacao[name] = value;
        this.setState({ avaliacao });
    }

    componentWillMount() {

        AvaliacaoApi.get(this.props.params.id).then((data) => {

            console.error("data:", data);

            let avaliacao = data;

            this.setState({ avaliacao });
        });
    }

    salvar(e) {

        const model = this.state.avaliacao;

        this.setState({ loading: true });

        AvaliacaoApi.save(model).then(() => {
            this.setState({ loading: false });
            this.props.router.push('/avaliacao');
        });
    }

    voltar() {
        this.props.router.push('/avaliacao');
    }

    verSlide(imagemPreview) {
        this.setState({ imagemPreview });
    }

    fecharImagem() {
        this.setState({ imagemPreview: {} });
    }

    render() {

        let { loading } = this.props;

        const {
            avaliacao,
            imagemPreview
        } = this.state;

        const {
            codigo,
            amostra,
            produtor,
            comprador,
            classificador,
            peso,
            umidade,
            ardido_grama,
            ardido_porcentagem,
            queimado_grama,
            queimado_porcentagem,
            total_ardidos_queimados_grama,
            total_ardidos_queimados_porcentagem,
            mofados_grama,
            mofados_porcentagem,
            fermentados_grama,
            fermentados_porcentagem,
            brotados_grama,
            brotados_porcentagem,
            imaturos_grama,
            imaturos_porcentagem,
            chochos_grama,
            status_id,
            chochos_porcentagem } = avaliacao;

        const handleChange = this.handleChange.bind(this);
        const voltar = this.voltar.bind(this);

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            nextArrow: <div style={{ left: '0', zIndex: 99 }} />,
            prevArrow: <div style={{ right: '0', zIndex: 99 }} />
        };

        return (
            <div>

                <Dimmer inverted active={imagemPreview.url} onClickOutside={() => this.fecharImagem()}>
                    <Segment style={{ width: '100%', maxWidth: '900px', margin: 'auto' }}>
                        <Image src={imagemPreview.url} style={{ height: '600px', width: '100%' }} />
                    </Segment>
                </Dimmer>

                <Form onSubmit={(e) => this.salvar(e)}>

                    <Grid>

                        <Grid.Row columns={1}>
                            <Grid.Column>
                                <div style={{ float: 'right' }}>
                                    <Button content="Voltar" type="button" onClick={() => voltar()} color="red" disabled={loading} />
                                    {
                                        status_id != 2 ? <Button content="Enviar Avaliação" type="submit" color="green" icon="save" disabled={loading} />
                                            : null}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Card fluid>

                        <Card.Content>

                            <Card.Header>  Laudo de Classificação de Soja - {codigo} </Card.Header>

                        </Card.Content>

                        <Card.Content>

                            <Grid columns={2}>

                                <Grid.Row>

                                    <Grid.Column>

                                        <Card fluid>

                                            <Card.Content>

                                                <Card.Header> Amostra de Imagens </Card.Header>

                                            </Card.Content>

                                            <Card.Content style={{ paddingBottom: '35px' }}>

                                                <Slider {...settings}>
                                                    <div className="link" onClick={() => this.verSlide({ url: Imagens.img1 })}><Image src={Imagens.img1} style={{ height: '500px', width: '100%' }} /></div>
                                                    <div className="link" onClick={() => this.verSlide({ url: Imagens.img2 })}><Image src={Imagens.img2} style={{ height: '500px', width: '100%' }} /></div>
                                                    <div className="link" onClick={() => this.verSlide({ url: Imagens.img3 })}><Image src={Imagens.img3} style={{ height: '500px', width: '100%' }} /></div>
                                                    <div className="link" onClick={() => this.verSlide({ url: Imagens.img4 })}><Image src={Imagens.img4} style={{ height: '500px', width: '100%' }} /></div>
                                                </Slider>

                                            </Card.Content>

                                        </Card>

                                    </Grid.Column>

                                    <Grid.Column>

                                        <Table celled striped stackable structured>

                                            <Table.Body>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Código: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {codigo} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Nº Amostra: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {amostra} </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width="7"> Requerente: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {comprador} </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width="7"> Produtor: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {produtor} </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width="7"> Responsavel pela Coleta (Classificador): </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {classificador} </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width="7"> Peso da Amostra: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {peso}g </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell width="7"> Grau de Umidade: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {umidade}% </strong>
                                                    </Table.Cell>
                                                </Table.Row>
                                                {/* <Table.Row>
                                        <Table.Cell width="7"> Peso da Amostra: </Table.Cell>
                                        <Table.Cell>
                                            <input type='text' disabled={true} name="peso" value={peso} onChange={(e) => handleChange(e, e.target)} />
                                        </Table.Cell>
                                    </Table.Row> */}

                                            </Table.Body>

                                        </Table>

                                        <Header>
                                            Fator de Qualidade
                                        </Header>

                                        <Table celled striped stackable structured>

                                            <Table.Header>

                                                <Table.Row>

                                                    <Table.HeaderCell>  </Table.HeaderCell>
                                                    <Table.HeaderCell> Grama (g)</Table.HeaderCell>
                                                    <Table.HeaderCell> Porcentagem (%) </Table.HeaderCell>

                                                </Table.Row>

                                            </Table.Header>
                                            <Table.Body>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Ardidos: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {ardido_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {ardido_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Queimados: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {queimado_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {queimado_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Total de Ardidos e Queimados: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {total_ardidos_queimados_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {total_ardidos_queimados_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Mofados: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {mofados_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {mofados_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Fermentados: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {fermentados_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {fermentados_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Brotados: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {brotados_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {brotados_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Imaturos: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {imaturos_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {imaturos_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>

                                                <Table.Row>
                                                    <Table.Cell width="7"> Chochos: </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {chochos_grama} </strong>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <strong> {chochos_porcentagem} </strong>
                                                    </Table.Cell>
                                                </Table.Row>


                                            </Table.Body>

                                        </Table>

                                    </Grid.Column>
                                </Grid.Row>

                            </Grid>

                        </Card.Content>

                    </Card>

                </Form>
            </div>
        )
    }
}

export default Cadastro;
