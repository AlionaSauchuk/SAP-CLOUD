import com.leverx.leverxspringdemo.domain.Book;
import com.sap.cloud.sdk.odatav2.connectivity.ODataException;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryBuilder;
import com.sap.cloud.sdk.odatav2.connectivity.ODataQueryResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class BookService {
    public List<Book> getBooksOdata(String destinationName) throws ODataException {
        ODataQueryResult result = ODataQueryBuilder.withEntity("/","Books").
                select("bid","authid", "caption").build().execute(destinationName);
        List<Map<String,Object>> listMap =  result.asListOfMaps();
        return  getBookList(listMap);
    }


    public List<Book>  getBookList (List<Map<String,Object>> listMap) {
        List <Book> booksList = new ArrayList<>();
        listMap.forEach(item->{
            Book book = new Book();
            book.setId(Integer.parseInt(item.get("bid").toString()));
            book.setAuthid(Integer.parseInt(item.get("authid").toString()));
            book.setCaption(item.get("caption").toString());
            booksList.add(book);
        });
        return booksList;
    }
}