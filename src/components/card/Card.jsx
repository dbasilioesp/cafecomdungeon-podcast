import './card.css'
import mixpanel from '../../plugins/mixpanel';

export default function Card (props){
    const { title, id, description, rpg, category, links } = props;

    const listLinks = links.split('\n')
    
    const trackClick = (card, link) => {
        const props = {
            link,
            id: card.id, 
            title: card.title,
        }
        mixpanel.track('Card Link', props)
    }

    return (
        <div className="card">
            <div className="card__header">
                <h1 className="card__title">{title}</h1>
                <span className="card__id">{id}</span>
            </div>
            <p className="card__content">
                { rpg && <span className="card__rpg">{rpg}</span>}
                { category && <span className="card__category">{category}</span>}
                <span className="card__description">{description}</span>
            </p>
            <div className="card__links">
                {
                    listLinks.map(link => (
                        <a 
                            href={link}
                            target="_blank" 
                            rel="noreferrer" 
                            key={link} 
                            onClick={() => trackClick(props, link)}
                        >{link}</a>
                    ))
                }
            </div>
        </div>
    )
}