import { Button } from 'antd-mobile';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { increment, decrement } from '@/store/modules/counter';
import './index.scss';
import { useState } from 'react';
import NavBar from '@/components/NavBar';

import logo from '@/assets/logo.png';
import logo2 from '@/assets/logo2.png';
import userAvatar from '@/assets/user-avatar.png';

const itemList = [
  {
    name: '找找找', // 找电影
    nameColor: '#2384E8',
    desc: '影院热映',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  {
    name: '热热热', // 热播剧
    nameColor: '#7A6ADB',
    desc: '剧集综艺',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  {
    name: '图图图', // 找图书
    nameColor: '#9F7860',
    desc: '热门新书',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  {
    name: '组组组', // 找小组
    nameColor: '#2AB8CC',
    desc: '志趣相投',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  {
    name: '音音音', // 找音乐
    nameColor: '#F48F2E',
    desc: '新碟榜',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  {
    name: '豆豆豆', // 豆品
    nameColor: '#42BD56',
    desc: '生活美学',
    icon: 'https://ossltc.leiting.com/ltctest/post/202409/ece93ed8557a4e419a3b0101b423cbaf.jpg'
  },
  
]

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  // const recommendList = useState([
  //   {
  //     name: '豆豆豆豆豆豆',
  //     score: 9.7,
  //   },
  //   {
  //     name: '豆豆豆豆豆豆',
  //     score: 9.6,
  //   },
  //   {
  //     name: '豆豆豆豆豆豆',
  //     score: 9.5,
  //   }
  // ])

  const [recommendList, setRecommendList] = useState([
    {
      name: '豆豆豆豆豆豆',
      score: 9.7,
    },
    {
      name: '豆豆豆豆豆豆',
      score: 9.6,
    },
    {
      name: '豆豆豆豆豆豆',
      score: 9.5,
    }
  ]);

  return (
    <div className='movie'>
      <NavBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />
      <div className='content'>
        <div className='item-list'>
          {itemList.map((item, index) => (
            <div className='item-box' key={index}>
              <div className='item-name' style={{ color: item.nameColor }}>{item.name}</div>
              <div className='item-desc'>{item.desc}</div>
            </div>
          ))}
        </div>

        {Array.from({ length: 2 }).map((_, i) => (
          <div className="recommend-banner" key={i}>
            <div className="recommend-left">
              <span className="label1">WEEK</span>
              <span className="label2">豆瓣周榜</span>
              <span className="label3">华语口碑剧集</span>
            </div>
            <div className="recommend-right">
              <div className="recommend-bg"></div>
              {recommendList.map((item, index) => (
                <div className="recommend-item" key={index}>
                  {index+1}.{item.name} <span className="recommend-sore">{item.score}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="recommend-banner">
          <div className="recommend-left">
            <span className="label1">WEEK</span>
            <span className="label2">豆瓣周榜</span>
            <span className="label3">华语口碑剧集</span>
          </div>
          <div className="recommend-right">
            <div className="recommend-bg"></div>
            {recommendList.map((item, index) => (
              <div className="recommend-item" key={index}>
                {index+1}.{item.name} <span className="recommend-sore">{item.score}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="route-to-back" onClick={() => navigate(-1)}>点击后退页面</div>

        <div className="recommend-test" style={{
          fontSize: '12px',
          color: '#ffd700',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255, 215, 0, 0.5)',
        }}>⭐️星星字符</div>

        {Array.from({ length: 30 }).map((_, i) => (
          <p className='test' key={i}>test{i}</p>
        ))}
      </div>
    </div>

  );
};

export default Home; 