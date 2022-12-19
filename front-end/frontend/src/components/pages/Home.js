import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { experienceActions } from '../../actions'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'


const mapStateToProps = function(state) {
  return {
    experienceList : state.experience.experienceList,
    loading : state.experience.fetching
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    actions: bindActionCreators({
    getAllExperiences: experienceActions.getAllExperiences,
    getAllExperiencesOfUser: experienceActions.getAllExperiencesOfUser,
    getExperienceOfUser: experienceActions.getExperienceOfUser,
    addExperience: experienceActions.addExperience,
    updateExperience: experienceActions.updateExperience,
    deleteExperience: experienceActions.deleteExperience
    }, dispatch)
  }
}


class HomeEditor extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isAddDialogShown: false,
      isNewExperience : true,
      experience: {
        startPoint: '',
        endPoint: '',
        vehicleType: '',
        departureHour: '',
        duration: 0,
        agglomeration: '',
        observations: '',
        satisfactionLevel: 0
      }
    }

    this.hideDialog = () => {
      this.setState({
        isAddDialogShown : false
      })
    }

    this.updateProperty = (property, value) => {
      let experience = this.state.experience
      experience[property] = value
      this.setState({
        experience: experience
      })
    }

    this.addNew = () => {
      let emptyExperience = {
        startPoint: '',
        endPoint: '',
        vehicleType: '',
        departureHour: '',
        duration: 0,
        agglomeration: '',
        observations: '',
        satisfactionLevel: 0
      }
      this.setState({
        experience: emptyExperience,
        isAddDialogShown: true
      })
    }

    this.saveExperience = () => {
      if (this.state.isNewExperience) {
        this.props.actions.addExperience(this.state.experience)
      } else {
        this.props.actions.updateExperience(this.state.experience.id, this.state.experience)
      }
      this.setState({
        isAddDialogShown : false,
        experience: {
            startPoint: '',
            endPoint: '',
            vehicleType: '',
            departureHour: '',
            duration: 0,
            agglomeration: '',
            observations: '',
            satisfactionLevel: 0
        }
      })
    }

    this.deleteExperience = (rowData) => {
      this.props.actions.deleteExperience(rowData.id)
    }

    this.editExperience = (rowData) => {
      let experienceCopy = Object.assign({}, rowData)
      this.setState({
        experience: experienceCopy,
        isNewExperience: false,
        isAddDialogShown: true
      })
    }

    this.tableFooter = <div>
      <span>
        <Button label="Add" onClick={this.addNew} icon="pi pi-plus" />
      </span>
    </div>

    this.addDialogFooter = <div>
      <Button   label="Save" icon="pi pi-save" onClick={() => this.saveExperience()} />
    </div>

    this.opsTemplate = (rowData) => {
      return <>
          <Button icon="pi pi-times" className="p-button-danger" onClick={() => this.deleteExperience(rowData)}  />
          <Button icon="pi pi-pencil" className="p-button-warning" onClick={() => this.editExperience(rowData)} />
      </>
    }
  }

  componentDidMount(){
    this.props.actions.getAllExperiences()
  }


  render () {
    const { experienceList } = this.props
    return (
      <>
        <DataTable value={experienceList} footer={this.tableFooter} >
          <Column header='Start point' field='startPoint' />
          <Column header='End point' field='endPoint' />
          <Column header='Vehicle type' field='vehicleType' />
          <Column header='Departure hour' field='departureHour' />
          <Column header='Duration' field='duration' />
          <Column header='Agglomeration' field='agglomeration' />
          <Column header='Observations' field='observations' />
          <Column header='Satisfaction Level' field='satisfactionLevel' />
          <Column body={this.opsTemplate} />
        </DataTable>
        {
          this.state.isAddDialogShown ?
            <Dialog   visible={this.state.isAddDialogShown} 
                      header='Add an experience' 
                      footer={this.addDialogFooter}
                      onHide={this.hideDialog}>
              <InputText onChange={(e) => this.updateProperty('title', e.target.value)} value={this.state.book.title} name="title" placeholder="title" />
              <InputText onChange={(e) => this.updateProperty('content', e.target.value)} value={this.state.book.content} name="content" placeholder="content" />
            </Dialog>
          :
            null
        }
      </>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeEditor)