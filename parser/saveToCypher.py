from neo4j import GraphDatabase
import pandas
import json



def fixjson(badjson):
    """Замена ковычек"""
    s = badjson
    idx = 0
    while True:
        try:
            start = s.index('": "', idx) + 4
            end1 = s.index('",\n', idx)
            end2 = s.index('"\n', idx)
            if end1 < end2:
                end = end1
            else:
                end = end2
            content = s[start:end]
            content = content.replace('"', '\\"')
            s = s[:start] + content + s[end:]
            idx = start + len(content) + 6
        except:
            return s


def as_json(maybejson):
    """Если это json то вернем объект"""
    try:
        json_object = json.loads(maybejson)
        return True, json_object
    except ValueError as e:
        return False, ""


class ImportClass:

    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()
                
    def create_product(self, product: dict):
        with self.driver.session() as session:
            session.write_transaction(self._create_product, product)

    @staticmethod
    def _create_product(tx, product: dict):
        tx.run("MERGE (P:PRODUCT {ProductID: $product_id}) "
                        "SET P :ORIGINAL "
                        "SET P.Category=$category "
                        "SET P.Views=$views "
                        "SET P.Sells=$sells ", product_id=product['id'], category=product['category'], views=product['views'], sells=product['count'])
        if product["other_contracts"] != "":
            for related in product["other_contracts"]:
                tx.run( "MERGE (relatedItem:PRODUCT {ProductID: $relaitedId}) "
                        "MERGE (P:PRODUCT {ProductID: $itemId})"
                        "MERGE (P)-[:RELAITED {Quantity: $count}]->(relatedItem)", itemId=product['id'], relaitedId=related['OtherSkuId'], count=related['Quantity'])


graph = ImportClass("neo4j://185.117.152.68:7687", "******", "********")

n_rows = 200000 # Скок читаем
n_skip = 0 #Скипаем на число из логов если упал сервер

print("Read .csv file")
csv_file = pandas.read_csv('parse.csv', delimiter=',', nrows=n_rows, skiprows=n_skip)
print("Complite read")

for id, row in enumerate(csv_file.iloc):
    print("%d/%d" % (id+n_skip+1, n_rows))
    row_id_CTE = int(row[0])
    row_name = row[1] if not pandas.isna(row[1]) else ""
    row_category = row[2] if not pandas.isna(row[2]) else ""
    row_about = row[3] if type(row[3]) is str else ""

    if not pandas.isna(row[4]):
        row_characteristic = as_json(fixjson(row[4]))[1]
    else:
        row_characteristic = ""

    if not pandas.isna(row[5]):
        row_regions = as_json(fixjson(row[5]))[1]
    else:
        row_regions = ""

    row_count = int(row[6]) if not pandas.isna(row[6]) else 0

    if not pandas.isna(row[7]):
        row_provider = as_json(fixjson(row[7]))[1]
    else:
        row_provider = ""

    row_country = row[8] if not pandas.isna(row[8]) else ""

    if not pandas.isna(row[9]):
        row_other_contracts = as_json(fixjson(row[9]))[1]
    else:
        row_other_contracts = ""

    row_views = int(row[10]) if not pandas.isna(row[10]) else ""
    row_cpgz = int(row[11]) if not pandas.isna(row[11]) else ""
    row_code = row[12] if not pandas.isna(row[12]) else ""
    row_model = row[13] if not pandas.isna(row[13]) else ""
    if not pandas.isna(row[14]):
        row_price = as_json(fixjson(row[14]))[1]
    else:
        row_price = ""

    product = {
        'id': row_id_CTE,
        'name': row_name,
        'category': row_category,
        'about': row_about,
        'characteristic': row_characteristic,
        'region': row_regions,
        'count': row_count,
        'provider': row_provider,
        'country': row_country,
        'other_contracts': row_other_contracts,
        'views': row_views,
        'cpgz': row_cpgz,
        'code': row_code,
        'model': row_model,
        'price': row_price
    }
    graph.create_product(product)


graph.close()


