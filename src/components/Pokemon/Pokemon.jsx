function Pokemon({name,image}){

    return (
        <div className="Pokemon-wrapper">
            <span>{name}</span>
            <img src={image} alt={name} />
        </div>
    )



}

export default Pokemon;