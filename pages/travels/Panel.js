import { Ecommerce } from '@/components/miscs/ContextEcommerceProvider';
import formatNumber from '@/components/miscs/formatNumber';
import minimize from '@/components/miscs/minimize';
import { useRouter } from 'next/router';
import React from 'react';
import nookie from 'nookies'
import Axios from 'axios';
import nProgress from 'nprogress';
import notify from '@/components/miscs/notify';

const Panel = ({ data }) => {

    const [totalAmount, setTotalAmount] = React.useState(data.price_adult)
    const [adultCount, setAdultCount] = React.useState(1)
    const [childCount, setChildCount] = React.useState(0)
    const [disabled, setDisabled] = React.useState(false)
    const { handleAddCart } = React.useContext(Ecommerce)
    const [selectedSchedule, setSelectedSchedule] = React.useState(null)
    const R = useRouter()
    const { jwt } = nookie.get(null)
    const { user, set } = React.useContext(Ecommerce)
    const [isWishlist, setIsWishlist] = React.useState(user ? user.wishlists.includes(data.id) : false)

    React.useEffect(() => {
        calculateTotalAmount()
    }, [adultCount, childCount])
    React.useEffect(() => {
        if (!data.schedules.length) setDisabled(true)
        else setSelectedSchedule(data.schedules[0])
    }, [])
    const calculateTotalAmount = () => setTotalAmount((adultCount * data.price_adult) + (childCount * data.price_child))
    const handleWishlist = async (operation) => {
        if (!user) {
            return notify({ title: 'Анхааруулга', message: 'Жагсаалт-д нэмэхийн тулд нэвтрэх шаардлагатай.', type: 'warning' })
        }
        nProgress.start()
        const headers = { headers: { 'Authorization': 'Bearer ' + jwt } };
        if (operation === 'add') {
            const res = await Axios.put(process.env.serverUrl + '/users/' + user.id, { wishlists: [...user.wishlists, data.id] }, headers)
            set({ user: { ...user, wishlists: res.data.wishlists } })
            setIsWishlist(true)
            nProgress.done()
        } else {
            let list = user.wishlists
            const index = list.indexOf(data.id)
            if (index > -1) list.splice(index, 1)
            const res = await Axios.put(process.env.serverUrl + '/users/' + user.id, { wishlists: [...list] }, headers)
            set({ user: { ...user, wishlists: res.data.wishlists } })
            setIsWishlist(false)
            nProgress.done()
        }
    }
    const cartCLick = () => {
        if(!user) {
            return R.push('/auth')
        }
        handleAddCart({
            schedule_id: selectedSchedule.id,
            travel: data,
            adult: adultCount,
            child: childCount,
            amount: totalAmount,
            schedule: selectedSchedule
        });
        R.push('/cart')
    }

    return (
        <div className="panel_wrapper">
            <div className="img_wrap"><img src={minimize(data.thumbnail_img, 'small')} /></div>
            <div className="count-wrap">
                <div className="count-wrap-col">
                    <div>Том хүн</div>
                    <div>Хүүхэд</div>
                </div>
                <div className="count-wrap-col">
                    <div className="count-wrap-control">
                        <div className="count-wrap-box" onClick={() => adultCount > 0 && setAdultCount(adultCount - 1)}>-</div>
                        <div className="count-wrap-box">{adultCount}</div>
                        <div className="count-wrap-box" onClick={() => setAdultCount(adultCount + 1)}>+</div>
                    </div>
                    <div className="count-wrap-control">
                        <div className="count-wrap-box" onClick={() => childCount > 0 && setChildCount(childCount - 1)}>-</div>
                        <div className="count-wrap-box">{childCount}</div>
                        <div className="count-wrap-box" onClick={() => setChildCount(childCount + 1)}>+</div>
                    </div>
                </div>
                <div className="count-wrap-col">
                    <div className="count-wrap-price">{data.price_adult} ₮</div>
                    <div className="count-wrap-price">{data.price_child} ₮</div>
                </div>
            </div>
            <div className="main_wrap">
                <div className="control_wrap">
                    <div className="bar">
                        <img className="icon" src="/img/calendar.png" />
                        <div className="info">
                            <div className="caption">Аялах огноо</div>
                            <div className="select-wrap">
                                <div className="seperate date">
                                    {disabled ?
                                        <small style={{ color: 'rgba(255,0,0,0.8)', fontSize: 14 }}>Одоогоор хуваарь гараагүй байна.</small>
                                        :
                                        <select onChange={e => setSelectedSchedule(JSON.parse(e.target.value))} value={selectedSchedule}>
                                            {data.schedules.map(x =>
                                                <option key={Math.random()} value={JSON.stringify(x)}>{x.start} - {x.end}</option>
                                            )}
                                        </select>
                                    }
                                </div>
                            </div>
                        </div>
                        <img className="arrow" src="/img/right-arrow.png" />
                    </div>
                    <div className="bar">
                        <img className="icon" src="/img/group.png" />
                        <div className="info">
                            <div className="caption">Хүний тоо</div>
                            <div className="select-wrap">
                                <div className="seperate">
                                    {adultCount}
                                    <span>том хүн</span>
                                </div>
                                <div className="seperate">
                                    {childCount}
                                    <span>хүүхэд</span>
                                </div>
                            </div>
                        </div>
                        <img className="arrow" src="/img/right-arrow.png" />
                    </div>
                </div>
                <h4>Нийт {formatNumber(totalAmount)}₮</h4>
                <div className="buttons_wrap">
                    <button disabled={disabled} className={`main ${disabled && 'disabled'}`}
                        onClick={cartCLick}
                    >ЗАХИАЛАХ</button>
                    {isWishlist ?
                        <button onClick={() => handleWishlist('remove')}><img src="/img/heart_fill.svg" />ЖАГСААЛТАД БАЙГАА</button>
                        :
                        <button onClick={() => handleWishlist('add')}><img src="/img/heart.png" />ЖАГСААЛТАД НЭМЭХ</button>
                    }
                </div>
                <div className="payments_wrap">
                    <span>Доорх төлбөрийн сонголтуудаар төлөх боломжтой</span>
                    <div className="logos_wrap">
                        <img src="/img/mongolchat.png" />
                        <img src="/img/memechat.png" />
                        <img src="/img/social_pay.png" />
                        <img src="/img/qpay.png" />
                        <img src="/img/visa.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Panel;