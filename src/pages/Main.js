import React, { useState, useEffect } from 'react';
import main from '../pages/Main.module.css';
// import Calendar2 from '../components/Calendar2';
import Calendar from '../components/Calendar';
import axios from 'axios';


function Main() {

  const [date, setDate] = useState(new Date());

  const [goods, setGoods] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8090/traders/home')
      .then(response => {
        setGoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the goods!', error);
      });
  }, []);


  const handleSearch = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:8090/traders/home/${searchName}`)
      .then(response => {
        setGoods(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the goods!', error);
      });
  };

  const disuse = [
    { num: 1, stockid: "2407210001", gname: "대왕님표여주쌀10kg", expdate: "2024-07-21" }

  ];

  const stock = [
    { num: 1, stockid: "2407210001", gname: "대왕님표여주쌀10kg", quantity: "2", gunit: "개" }

  ];



  return (
    <div className={main.Main}>
      <div className={main.goods_page}>
        <div className={main.leftSection}>
          <form onSubmit={handleSearch} id='goods-form'>
            <input type='search'
              name='goods_search'
              placeholder='제품코드, 카테고리명, 상품명 검색'
              className={main.inputGoodsSearch}
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)} />
            <button type="submit" className={main.btnGoodsSearch}>검색</button>
          </form>
          <div className={main.goodsList}>
            <table className={main.goodsTable}>
              <thead>
                <tr>
                  <th style={{ width: '50px' }}><input type="checkbox" /></th>
                  <th style={{ width: '65px' }}>제품번호</th>
                  <th>제품코드</th>
                  <th>카테고리</th>
                  <th>상품명(단위)</th>
                  <th>가격</th>
                </tr>
              </thead>
              <tbody>
                {goods.map((goods, index) => (
                  <tr key={index} className={main.goodsItem}>
                    <td><input type="checkbox" /></td>
                    <td>{goods.num}</td>
                    <td>{goods.gcode}</td>
                    <td>{goods.gcategory}</td>
                    <td>{goods.gname}</td>
                    <td>{goods.gcostprice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={main.events}>
            이벤트 슬라이드
          </div>
        </div>
      </div>

      <div className={main.rightsection}>
         <div className={main.locCalender}>
          <Calendar />
          {/* <useCalendar /> */}
        </div>
        <div className={main.tableLabel}>
          <div className={main.tableLabel2}>유통기한 임박 상품 리스트</div>
          <div className={main.tableLabel3}>재고 부족 상품 리스트</div>
        </div>
        <div className={main.rightSectionBox}>
          <div className={main.disuseList}>
            <table className={main.disuseTable}>
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>상품번호</th>
                  <th>제품코드</th>
                  <th>상품명</th>
                  <th>유통기한</th>
                </tr>
              </thead>
              <tbody>
                {disuse.map((disuse, index) => (
                  <tr key={index} className={main.disuseItem}>
                    <td>{disuse.num}</td>
                    <td>{disuse.stockid}</td>
                    <td>{disuse.gname}</td>
                    <td>{disuse.expdate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={main.stockList}>
            <table className={main.stockTable}>
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>상품번호</th>
                  <th>제품코드</th>
                  <th>상품명</th>
                  <th>수량</th>
                  <th>단위</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((stock, index) => (
                  <tr key={index} className={main.stockItem}>
                    <td>{stock.num}</td>
                    <td>{stock.stockid}</td>
                    <td>{stock.gname}</td>
                    <td>{stock.quantity}</td>
                    <td>{stock.gunit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
