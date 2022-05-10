import React from 'react';
import './activitiesmain.css';
class SortCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "React",
      options: [
        { value: '', text: 'Visos kategorijos' },
        { value: 'Išsiėmimas', text: 'Pinigų išsiėmimas' },
        { value: 'Drabužiai', text: 'Rūbai/Batai' },
        { value: 'Maistas/Gėrimai', text: 'Maistas/Gėrimai' },
        { value: 'Elektronika', text: 'Elektronika' },
        { value: 'Dovanos', text: 'Dovanos' },
        { value: 'Namų priežiūra', text: 'Namų priežiūra' },
        { value: 'Sąskaitos/Mokesčiai', text: 'Sąskaitos/Mokesčiai' },
        { value: 'Nuoma', text: 'Namo nuoma' },
        { value: 'Santaupos', text: 'Santaupos' },
        { value: 'Alga', text: 'Alga' }
      ]
    };
  }

  setQ(value) {
    this.setState({ category: value })
    this.props.parentCallback(value);
  }

  render() {
    return (
      <>
          <label className='text-start'>Kategoriją</label>
          <select
            defaultValue={this.state.category}
            onChange={(e) => this.setQ(e.target.value)}
            className=''>
            <option value='' disabled>--Pasirinkite kategoriją--</option>
            {this.state.options.map(item => {
              return (<option key={item.value} value={item.value}>{item.text}</option>)
            })}
          </select>
      </>
    )
  }
}
export default SortCategory